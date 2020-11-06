import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import mime from './mime.json';
import c from './colors';
import {table} from './table';
import {mwLivereload, mwInjectLivereload} from './livereload';
import {version} from './../../package.json';

export function startHTTPServer(options){
    const production = (options.watch === false && options.cache && options.compress);
    return new Promise((resolve,reject)=>{
        const middlewares = [
            mwServer(options),
            mwLivereload(options),
            mwFile(options),
            mwStatic(options),
            mwInjectLivereload(options),
            mwEncode(options),
            mwCache(options),
        ]

        const server = http.createServer(function (req, res) {
            runMiddlewares(middlewares,req,res);
        });

        server.on('listening',_ => {
            resolve(server);
            table()
                .line(production ? 'Derver server started' : 'Development server started','bold')
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

    mwArray.push((req,res)=>{
        res.writeHead(200);
        res.end(res.body||'');
    })

    let mayContinue = false;
    const next = ()=>mayContinue=true;

    for(let mw of mwArray){
        if(typeof mw !== 'function') continue;
        mayContinue = false;
        mw(req,res,next);
        if(!mayContinue) break;
    }
}


function mwFile(options){
    return function(req,res, next){
        req.file = path.join(options.dir,req.url);
        req.extname = path.extname(req.file);

        if(req.extname === ''){
            req.file = path.join(req.file,options.index);
            req.extname = path.extname(req.file);
        }

        req.exists = fs.existsSync(req.file);

        if(options.spa && !req.exists && req.extname === path.extname(options.index)){
            req.file = path.join(options.dir,options.index);
            req.exists = fs.existsSync(req.file);
        }

        next();
    }
}

function mwServer(options){
    return function(req,res, next){
        res.setHeader('Server', 'Derver/'+version);
        next();
    }
}

function mwStatic(options){
    
    return function(req,res,next){
    
        if(!req.exists){
            console.log(c.gray('  [web] ')+req.url + ' - ' + c.red('404 Not Found'));
            res.writeHead(404, {'Content-Type': 'text/plain'});
            return res.end('Not found');
        }

        if(mime[req.extname]) res.setHeader('Content-Type', mime[req.extname]);

        res.body = fs.readFileSync(req.file);
        console.log(c.gray('  [web] ')+req.url + ' - ' + c.green('200 OK'));
        next();
    }
}


function mwEncode(options){

    if(!options.compress) return null;

    return function(req,res,next){
        if(req.headers['accept-encoding']){
            if(req.headers['accept-encoding'].includes('br')){
               res.setHeader('Content-Encoding', 'br');
                res.body = zlib.brotliCompressSync(res.body);
            }else if(req.headers['accept-encoding'].includes('gzip')){
                res.setHeader('Content-Encoding', 'gzip');
                 res.body = zlib.gzipSync(res.body); 
            }  
        }
        next();
    }
}

function mwCache(options){

    if(!options.cache) return null;

    return function(req,res,next){
        if(typeof options.cache !== 'number') options.cache = 31536000;
        res.setHeader('Cache-Control', 'max-age='+options.cache);
        next();
    }
}

