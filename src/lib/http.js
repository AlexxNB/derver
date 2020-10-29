import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from './mime.json';
import c from './colors';
import {lrClient,lrMiddleware,getLrURL} from './livereload';

export function startHTTPServer(options){

    const livereload = lrMiddleware(options);
    const file = mwFile(options);
    const static = mwStatic(options);

    http.createServer(function (req, res) {
        runMiddlewares([
            livereload,
            file,
            static
        ],req,res);
    }).listen(options.port,options.host,_ => {
        console.log(`Started server on ${c.blue(`http://${options.host}:${options.port}`)}`);
    });
}

function runMiddlewares(mwArray,req,res){
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
    
    return function(req,res){
    
        if(!fs.existsSync(req.file)){
            console.log(c.gray('   [web] ')+c.yellow(req.url) + ' - ' + c.red('404 Not Found'));
            res.writeHead(404, {'Content-Type': 'text/plain'});
            return res.end('Not found');
        }

        mime[req.extname] ? res.writeHead(200, {'Content-Type': mime[req.extname]}) : res.writeHead(200);

        let body = fs.readFileSync(req.file);

        if(['.html','.htm'].includes(req.extname)) body = injectLivereload(body);

        console.log(c.gray('   [web] ')+c.yellow(req.url) + ' - ' + c.green('200 OK'));

        return res.end(body);
    }
}

function injectLivereload(body){
    return Buffer.from(
        body
            .toString('utf-8')
            .replace(
                /(<\/body>)/,
                `<script>(${lrClient()})('${getLrURL()}')</script>\n$1`
            )
    );
}

