import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from './mime.json';
import c from './colors';
import {lrClient,lrServer} from './livereload';

export function startHTTPServer(options){

    const file = mwFile(options);
    const static = mwStatic(options);

    http.createServer(function (req, res) {
        file(req,res);
        static(req,res);
    }).listen(options.port,options.host,_ => {
        console.log(`Started server on ${c.blue(`http://${options.host}:${options.port}`)}`);
    });
}

function mwFile(options){
    return function(req,res){
        let file = path.join(options.dir,req.url);
        let ext = path.extname(file);

        if(ext === ''){
            file = path.join(file,options.index);
            ext = path.extname(file);
        }

        req.file = file;
        req.extname = ext;
    }
}

function mwStatic(options){
    
    return function(req,res){
    
        if(!fs.existsSync(req.file)){
            res.writeHead(404, {'Content-Type': 'text/plain'});
            return res.end('Not found');
        }

        mime[req.extname] ? res.writeHead(200, {'Content-Type': mime[req.extname]}) : res.writeHead(200);

        let body = fs.readFileSync(req.file);

        if(['.html','.htm'].includes(req.extname)) body = injectLivereload(body);

        return res.end(body);
    }
}

function injectLivereload(body){
    return Buffer.from(
        body
            .toString('utf-8')
            .replace(
                /(<\/body>)/,
                `<script>${lrClient()}</script>\n$1`
            )
    );
}

