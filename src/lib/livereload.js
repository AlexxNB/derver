import http from 'http';
import os from 'os';
import path from 'path';
import fs from 'fs';

const LR_URL = '/derver-livereload-events';
const LR_REMOTE_URL = '/derver-livereload-remote';

const listeners = new Set();

export function livereload(event,p1,p2){
  listeners.forEach(listener=>{
      if(typeof listener[event] == 'function') listener[event](p1,p2);
    });
}

export function createRemote(options){

    const remoteID = typeof options == 'string' ? options : false;

    let host = 'localhost';
    let port = 7000;

    if(!remoteID){
        options && options.host && (host = options.host)
        options && options.port && (port = options.port)
    }

    function sendCommand(command,data){
        return new Promise((resolve)=>{

            const config = remoteID && getRemoteConfig(remoteID);
            config && config.host && (hostname = config.host);
            config && config.port && (port = config.port)

            const req_options = {
                hostname: (config && config.host) || host,
                port: (config && config.port) || port,
                path: LR_REMOTE_URL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const req = http.request(req_options, (res)=>{
                res.on('data',(chunk)=>{
                    if(chunk.toString()==='REMOTE OK')
                        resolve('OK')
                    else {
                        console.log('[Derver remote]: Warning: wrong command ' + command)
                        resolve('WARNING');
                    }
                });
            });
            req.on('error', (e)=>{
              console.log('[Derver remote]: Warning:' + e.message)
                resolve('WARNING');
            });
            req.write(JSON.stringify({command,data:data||{}}));
            req.end();
        });
    }

    return {
        reload(){return sendCommand('reload')},
        console(text){return sendCommand('console',{text})},
        error(text,header){return sendCommand('error',{text,header})}
    }
}

export function mwLivereload(options){
    if(!options.watch && !options.remote) return null;
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
        }else if(options.remote && req.url == LR_REMOTE_URL){
            if(req.method == 'POST'){
                let json = '';

                req.on('data', chunk => {
                    json += chunk.toString();
                });

                req.on('end', () => {
                    const request = JSON.parse(json||'{}');

                    if(request.command == 'reload') livereload('reload');
                    else if(request.command == 'console') livereload('console',request.data.text);
                    else if(request.command == 'error') livereload('error',request.data.text,request.data.header);
                    else return res.end('REMOTE WRONG COMMAND');

                    res.end('REMOTE OK');
                });
            }else next();
        } else next();
    }
}

export function getLrURL(){
    return LR_URL;
}

export function getRemoteURL(){
    return LR_REMOTE_URL;
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
                showModal(data.header,data.text);
            }, false);
        
            source.addEventListener('open', function(e) {
              if(timer) location.reload();
              console.log('[Livereload] Ready')
            }, false)

            source.addEventListener('error', function(e) {

              if (e.eventPhase == EventSource.CLOSED) source.close();

              
              if (e.target.readyState == EventSource.CLOSED) {
                console.log("[Livereload] Disconnected! Retry in 5s...");
                !timer && showModal('Disconnected!','Connection with server was lost.');
                timer = setTimeout(livereload,5000);
              }else if (e.target.readyState == EventSource.CONNECTING) {
                console.log("[Livereload] Connecting...");
              }
            }, false);
          } else {
            console.error("[Livereload] Can't start Livereload! Your browser doesn't support SSE")
          }
        }

        function showModal(header,text){
          const message = document.createElement('div');
                message.innerHTML = `
                  <div class="lrmsg-bg">
                    <div class="lrmsg-modal">
                      <div class="lrmsg-close" onclick="this.parentNode.parentNode.remove()">×</div>
                      <div class="lrmsg-header">${header}</div>
                      <div class="lrmsg-content">${text}</div>
                    </div>
                  </div>
                  <style>
                    .lrmsg-bg{
                      font-family: Verdana, Geneva, sans-serif;
                      font-size: 16px;
                      background: rgba(30, 30, 30, 0.6);
                      position: fixed;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      z-index: 1;
                    }

                    .lrmsg-modal{
                      position: relative;
                      max-width: 600px;
                      max-height: 400px;
                      margin: 40px auto; 
                      margin-top: 0px;
                      background-color: #1e1e1e;
                      border-top: 3px solid red;
                      border-radius: 5px;
                      opacity: 0;
                      animation: slide 0.3s forwards;
                      color: #cccccc;
                    }

                    .lrmsg-header{
                      font-weight: bold;
                      font-size: 18px;
                      padding: 10px;
                    }

                    .lrmsg-close{
                      float: right;
                      font-weight: bold;
                      color: #cccccc;
                      font-size: 25px;
                      margin: 3px 10px;
                      cursor: pointer;
                    }

                    .lrmsg-close:hover{color:#9a9a9a}

                    .lrmsg-content{
                      padding: 10px;
                      border-top: 1px solid #363636;
                    }

                    @keyframes slide {
                      100% { margin-top: 40px; opacity: 1;}
                  }
                  </style>
                `;

                document.body.append(message);
        }

        livereload();

    }).toString(); 
};

export function mwInjectLivereload(options){
  
  if(!options.watch && !options.remote) return null;
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

function getRemoteConfig(name){
    const tmp = os.tmpdir();
    const file = path.join(tmp,'derver_'+name);
    if(!fs.existsSync(file)) return false;
    return JSON.parse(fs.readFileSync(file,'utf-8'));
}