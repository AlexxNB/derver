import {startHTTPServer} from './lib/http';
import {startWatchers} from './lib/watch';


export function tinds(options){
    startHTTPServer(options);
    startWatchers(options);
}
