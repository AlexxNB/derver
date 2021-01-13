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

        const server = http.createServer(function (req, res) {
            runMiddlewares([
                mwSend(options),
                mwServer(options),
                ...options.middlewares.list(),
                mwLivereload(options),
                mwFile(options),
                mwStatic(options),
                mwInjectLivereload(options),
                mwEncode(options),
                mwCache(options),
            ],req,res);
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

        process.on('SIGTERM', ()=>server.close());
        process.on('exit', ()=>server.close());
    });    
}

export function createMiddlwaresList(){
    const middlewares = [];

    function addMiddleware(obj){
        for(mw of obj.middlewares){
            middlewares.push(function(req,res,next){
                if(obj.method && obj.method !== req.method) return next();
    
                if(obj.pattern){
                    const params = getParams(obj.pattern,req.url);
                    if(!params) return next();
                    req.params = params; 
                }
                
                mw(req,res,next);
            });
        }
    }

    function parseArguments(args,name){
        args = Array.from(args);
        return {
            method: name == 'use' ? null : name.toUpperCase(),
            pattern: args.length > 0 && typeof args[0] == 'string' ? args.shift() : null,
            middlewares: args.filter(fn => typeof fn == 'function')
        }
    }

    const methods = new Proxy({},{
        get(_, name) {
            if(name == 'list') return ()=>middlewares;
            return function(){
                addMiddleware(parseArguments(arguments,name));
                return methods;
            };
        }
    });

    return methods;
}

function runMiddlewares(mwArray,req,res){

    mwArray.push((req,res)=>res.send(res.body||''))

    const next = ()=>{
        let mw;
        while(!mw && mwArray.length > 0){
            mw = mwArray.shift();
        }
        mw && mw(req,res,next);
    }

    next();
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

function mwSend(options){
    return function(req,res, next){
        res.send = function(message){
            res.writeHead(200);
            res.end(message);
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

export function getParams(pattern,path){
    const keys = [];
    let params = {};
    let rx = pattern
       .split('/')
       .map(s => s.startsWith(':') ? (keys.push(s.slice(1)),'([^\\/]+)') : s)
       .join('\\/');

    const match = path.match(new RegExp(`^${rx}$`));
    if(!match) return null;
    keys.forEach((key,i) => params[key] = match[i+1]);

    return params
}