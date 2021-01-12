import c from './colors';
import {livereload} from './livereload';
import watch from 'node-watch';

export function startWatchers(options){
    
    if(typeof options.watch === 'string') options.watch = [options.watch];

    if(options.watch){

        console.log(c.yellow('       Waiting for changes...\n\n'));

        const watchers = [];
        
        process.on('SIGTERM', ()=>watchers.forEach(w=>w.close()));
        process.on('exit', ()=>watchers.forEach(w=>w.close()));

        const cooldown = new Set();
        const debounce = (key, fn)=>{
            if(cooldown.has(key)) return;
            cooldown.add(key);
            setTimeout(()=>cooldown.delete(key),100);
            fn();
        }

        for(let watchitem of options.watch){
            watchers.push(
                watch(watchitem,{recursive: true}, async function(evt, name) {

                    debounce(watchitem,()=>console.log(c.gray('[watch] ')+'Changes in ' + c.blue(watchitem)));
                
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
            );
        }
    }
}