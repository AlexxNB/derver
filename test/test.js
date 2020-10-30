const {tinds} = require('./../dist/tinds.cjs.js');

tinds({
    dir: 'test/public',
    onwatch: (livereload,watcher,file,evt)=>{
        console.log('Hello',watcher,file,evt);
    }
})