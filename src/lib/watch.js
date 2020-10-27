import fs from 'fs';
import path from 'path';
import c from './colors';

export function startWatchers(options){

    watchDir(options.dir, function(evt, name) {
        console.log(evt, name);
    });

    console.log('Waiting for changes in directories:');
    console.log(c.yellow(options.dir));
}

function watchDir(dirname,callback){
    fs.watch(dirname, callback);

    fs.readdirSync(dirname).forEach(file => {
        const filepath = path.join(dirname,file);
        if(fs.statSync(filepath).isDirectory()) watchDir(filepath,callback);
    });
}