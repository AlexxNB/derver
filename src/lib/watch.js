import fs from 'fs';
import path from 'path';
import c from './colors';
import {livereload} from './livereload';

export function startWatchers(options){
    if(options.watch === null) {
        options.watch = options.dir;
    }

    if(typeof options.watch === 'string') options.watch = [options.watch];

    if(options.watch){

        console.log(c.yellow('       Waiting for changes...\n\n'));

        for(let watchitem of options.watch){
            watchDir(watchitem, async function(evt, name) {
                console.log(c.gray('[watch] ')+'Changes in ' + c.blue(watchitem));

                let lrFlag = true;
                if(typeof options.onwatch === 'function'){

                    await options.onwatch({
                        prevent: ()=>lrFlag=false,
                        reload: ()=>livereload('reload'),
                    },watchitem,name,evt)
                }
                if(lrFlag) livereload('reload');
            });
        }
    }
}

function watchDir(dirname,callback){

    fs.watch(dirname, (evt,name) => {
        const f = path.join(dirname,name);
        debounce(f,callback)(evt,f)
    });

    fs.readdirSync(dirname).forEach(file => {
        const filepath = path.join(dirname,file);
        if(fs.statSync(filepath).isDirectory()) watchDir(filepath,callback);
    });
}

const cash = new Set();
function debounce(key,func){
    return function(){
        if(cash.has(key)) return;
        cash.add(key);
        setTimeout(_ => cash.delete(key),100);
        func.apply(null,arguments);
    } 
}