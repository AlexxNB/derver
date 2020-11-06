const {derver} = require('./../dist/derver.cjs.js');

derver({
    dir: 'test/public',
    watch: false,
    cache: true,
    compress: true,
    onwatch: (livereload,watcher,file,evt)=>{
        console.log('Hello',watcher,file,evt);
        // livereload.prevent(); livereload.console('Hello');
        // livereload.prevent(); livereload.error('Error text','Build error');
    }
})