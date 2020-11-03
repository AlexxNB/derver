const LR_URL = '/tinds-livereload-events';

const listeners = new Set();

export function livereload(event,data){
    listeners.forEach(listener=>{
      if(typeof listener[event] == 'function') listener[event](data);
    });
}

export function lrMiddleware(options){
    return function(req,res,next){
        if(req.url == LR_URL){

            const listener = {
                reload: ()=>res.write('event: refresh\ndata: now\n\n'),
                console: (str)=>res.write(`event: console\ndata: ${str}\n\n`)
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
export function lrClient(){
    return (function(URL){
        let timer;

        function livereload(){
          if (!!window.EventSource) {
            var source = new EventSource(URL)
        
            source.addEventListener('refresh', function(e) {
                location.reload();
            }, false)

            source.addEventListener('console', function(e) {
                console.log(e.data);
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
            }, false)
          } else {
            console.error("[Livereload] Can't start Livereload! Your browser doesn't support SSE")
          }
        }

        livereload();

    }).toString(); 
};
