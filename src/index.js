import {startHTTPServer} from './lib/http';
import {startWatchers} from './lib/watch';

let default_options = {
    port: 7000,
    host: 'localhost',
    index: 'index.html',
    dir: 'public',
    watch: null
}

export function tinds(options){
    const opt = Object.assign(default_options,options);

    startHTTPServer(opt);
    startWatchers(opt);
}
