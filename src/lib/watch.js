import c from './colors';
import {livereload} from './livereload';
import watch from 'node-watch';

export function startWatchers(options){
    
    if(typeof options.watch === 'string') options.watch = [options.watch];

    if(options.watch){

        console.log(c.yellow('       Waiting for changes...\n\n'));

        for(let watchitem of options.watch){
            watch(watchitem,{recursive: true}, async function(evt, name) {
                console.log(c.gray('[watch] ')+'Changes in ' + c.blue(watchitem));

                let lrFlag = true;
                if(typeof options.onwatch === 'function'){

                    await options.onwatch({
                        prevent: ()=>lrFlag=false,
                        reload: ()=>livereload('reload'),
                        console: (str)=>livereload('console',str),
                        error: (str,header)=>livereload('error',str,header),
                    },watchitem,name,evt)
                }
                if(lrFlag) livereload('reload');
            })
        }
    }
}