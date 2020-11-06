import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from './mime.json';
import c from './colors';
import {table} from './table';
import {mwLivereload, mwInjectLivereload} from './livereload';

export function startHTTPServer(options){
    return new Promise((resolve,reject)=>{
        const middlewares = [
            mwLivereload(options),
            mwFile(options),
            mwStatic(options),
            mwInjectLivereload(options),
            mwGzip(options)
        ]

        const server = http.createServer(function (req, res) {
            runMiddlewares(middlewares,req,res);
        });

        server.on('listening',_ => {
            resolve(server);
            table()
                .line('Development server started','bold')
                .line('on')
                .line(`http://${options.host}:${options.port}`,'blue')
                .print(5,'green')
        })

        server.on('error',e => {
            console.log(c.bold('\n\nServer starting error:'));
            console.log('  '+c.red(e.toString()) + '\n\n');
            reject(e.toString());
        })
        
        server.listen(options.port,options.host);
    });

    
}

function runMiddlewares(mwArray,req,res){

    mwArray.push((req,res)=>res.end(res.body||''))

    let mayContinue = false;
    const next = ()=>mayContinue=true;

    for(let mw of mwArray){
        mayContinue = false;
        mw(req,res,next);
        if(!mayContinue) break;
    }
}


function mwFile(options){
    return function(req,res, next){
        let file = path.join(options.dir,req.url);
        let ext = path.extname(file);

        if(ext === ''){
            file = path.join(file,options.index);
            ext = path.extname(file);
        }

        req.file = file;
        req.extname = ext;

        next();
    }
}

function mwStatic(options){
    
    return function(req,res,next){
    
        if(!fs.existsSync(req.file)){
            console.log(c.gray('  [web] ')+req.url + ' - ' + c.red('404 Not Found'));
            res.writeHead(404, {'Content-Type': 'text/plain'});
            return res.end('Not found');
        }

        mime[req.extname] ? res.writeHead(200, {'Content-Type': mime[req.extname]}) : res.writeHead(200);
        res.body = fs.readFileSync(req.file);
        console.log(c.gray('  [web] ')+req.url + ' - ' + c.green('200 OK'));
        next();
    }
}


function mwGzip(options){
    return function(req,res,next){
        console.log(req.headers);
        next();
    }
}

