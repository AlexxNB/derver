import {startHTTPServer} from './lib/http';
import {startWatchers} from './lib/watch';
export {livereload} from './lib/livereload';

let default_options = {
    port: 7000,
    host: 'localhost',
    index: 'index.html',
    dir: 'public',
    compress: false,
    cache: false,
    spa: false,
    watch: null,
    onwatch: null
}

export async function derver(options){
    const opt = Object.assign(default_options,options);

    try{
        await startHTTPServer(opt);
    }catch{
        process.exit(1);
    }
    
    startWatchers(opt);
}
