import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from './mime.json';
import c from './colors';



export function startHTTPServer(options){

    const static = mwStatic(options);

    http.createServer(function (req, res) {
        static(req,res);
    }).listen(options.port,options.host,_ => {
        console.log(`Started server on ${c.blue(`http://${options.host}:${options.port}`)}`);
    });
}

function mwStatic(options){
    
    return function(req,res){
        let file = path.join(options.dir,req.url);
        let ext = path.extname(file);

        if(ext === ''){
            file = path.join(file,options.index);
            ext = path.extname(file);
        }

        if(!fs.existsSync(file)){
            res.writeHead(404, {'Content-Type': 'text/plain'});
            return res.end('Not found');
        }

        mime[ext] ? res.writeHead(200, {'Content-Type': mime[ext]}) : res.writeHead(200) ;
        return res.end(fs.readFileSync(file));
    }
}