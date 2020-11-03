const {derver} = require('./../dist/derver.cjs.js');

derver({
    dir: 'test/public',
    onwatch: (livereload,watcher,file,evt)=>{
        console.log('Hello',watcher,file,evt);
        // livereload.prevent(); livereload.console('Hello');
        
    }
})