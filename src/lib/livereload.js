const LR_URL = '/tinds-livereload-events';

const listeners = new Set();

export function livereload(event,data){
    listeners.forEach(listener=>{
      if(typeof listener[event] == 'function') listener[event](data);
    });
}

export function mwLivereload(options){
    return function(req,res,next){
        if(req.url == LR_URL){

            const write = (evnt,data)=>res.write(`event: ${evnt}\ndata: ${JSON.stringify(data||{})}\n\n`)

            const listener = {
                reload: ()=>write('refresh'),
                console: (text)=>write('console',{text}),
                error: (text,header)=>write('srverror',{text,header:(header||'Error')}),
            }

            listeners.add(listener);

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            });

            res.on('close', function() {
                listeners.delete(listener);
            });
            res.write('data: connected\n\n')
        }else next();
    }
}

export function getLrURL(){
    return LR_URL;
}

// Must be a clean function. Will be injected in browser client in <script> tag.
function lrClient(){
    return (function(URL){
        let timer;

        function livereload(){
          if (!!window.EventSource) {
            var source = new EventSource(URL);

            function getData(e){
              return JSON.parse(e.data);
            }
        
            source.addEventListener('refresh', function(e) {
                location.reload();
            }, false)

            source.addEventListener('console', function(e) {
                console.log(getData(e).text);
            }, false)

            source.addEventListener('srverror', function(e) {
                let data = getData(e);
                const message = document.createElement('div');
                message.innerHTML = `
                  <div class="lrmsg-bg">
                    <div class="lrmsg-modal">
                      <div class="lrmsg-close" onclick="this.parentNode.parentNode.remove()">×</div>
                      <div class="lrmsg-header">${data.header}</div>
                      <div class="lrmsg-content">${data.text}</div>
                    </div>
                  </div>
                  <style>
                    .lrmsg-bg{
                      font-family: Verdana, Geneva, sans-serif;
                      font-size: 16px;
                      background: rgba(0, 0, 0, 0.7);
                      position: fixed;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                    }

                    .lrmsg-modal{
                      position: relative;
                      max-width: 600px;
                      max-height: 400px;
                      margin: 40px auto; 
                      margin-top: 0px;
                      background-color: white;
                      border-top: 3px solid red;
                      border-radius: 5px;
                      opacity: 0;
                      animation: slide 0.3s forwards;
                    }

                    .lrmsg-header{
                      font-weight: bold;
                      font-size: 18px;
                      padding: 10px;
                    }

                    .lrmsg-close{
                      float: right;
                      font-weight: bold;
                      color: silver;
                      font-size: 25px;
                      margin: 3px 10px;
                      cursor: pointer;
                    }

                    .lrmsg-close:hover{color:black}

                    .lrmsg-content{
                      padding: 10px;
                      border-top: 1px solid silver;
                    }

                    @keyframes slide {
                      100% { margin-top: 40px; opacity: 1;}
                  }
                  </style>
                `;

                document.body.append(message);
            }, false)
        
            source.addEventListener('open', function(e) {
              if(timer) location.reload();
              console.log('[Livereload] Ready')
            }, false)
        
            source.addEventListener('error', function(e) {

              if (e.eventPhase == EventSource.CLOSED) source.close();

              if (e.target.readyState == EventSource.CLOSED) {
                console.log("[Livereload] Disconnected! Retry in 5s...");
                timer = setTimeout(livereload,5000);
              }else if (e.target.readyState == EventSource.CONNECTING) {
                console.log("[Livereload] Connecting...");
              }
            }, false);
          } else {
            console.error("[Livereload] Can't start Livereload! Your browser doesn't support SSE")
          }
        }

        livereload();

    }).toString(); 
};

export function mwInjectLivereload(options){
  return function(req,res,next){
    if(['.html','.htm'].includes(req.extname)){
      res.body = Buffer.from(
        res.body.toString('utf-8').replace(
            /(<\/body>)/,
            `<script>(${lrClient()})('${LR_URL}')</script>\n$1`
        )
      );
    }
    
    next();
  }
}