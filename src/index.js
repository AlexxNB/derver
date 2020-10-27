import {startHTTPServer} from './lib/http';
import {startWatchers} from './lib/watch';

startHTTPServer({
    dir: 'test'
});

startWatchers({
    dir: 'test'
});