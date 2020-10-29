import fs from 'fs';
import path from 'path';
import c from './colors';
import {livereload} from './livereload';

export function startWatchers(options){
    if(options.watch === null) {
        options.watch = {};
        options.watch[options.dir] = 'reload';
    }

    if(options.watch){

        console.log('Waiting for changes in directories:');

        Object.entries(options.watch).forEach(w=>{
            watchDir(w[0], function(evt, name) {
                console.log(c.gray('   [watch] ')+c.yellow('Changes in ') + c.blue(w[0]));
                if(w[1]=='reload') livereload('reload');
            });
            console.log('  '+c.yellow('- '+w[0]));
        });
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