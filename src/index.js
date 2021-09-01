import {startHTTPServer,createMiddlwaresList} from './lib/http';
import {startWatchers} from './lib/watch';
export {createRemote} from './lib/livereload';

let default_options = {
    port: 7000,
    host: 'localhost',
    index: 'index.html',
    dir: 'public',
    compress: false,
    cache: false,
    spa: false,
    watch: null,
    onwatch: null,
    remote: false,
    parseJson: true,
    banner: true,
    log: true
}

export function derver(options){
    const opt = Object.assign(default_options,options,{middlewares:createMiddlwaresList()});

    (async()=>{
        if(opt.dir && opt.watch === null) opt.watch = opt.dir;

        try{
            await startHTTPServer(opt);
        }catch(err){
            console.log(err.message)
            process.exit(1);
        }
        
        startWatchers(opt);
    })()
    
    return opt.middlewares;
}
