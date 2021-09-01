const {derver,createRemote} = require('./../dist/derver.cjs.js');

const app = derver({
    dir: 'test/public',
    spa: true,
    remote: 'testname',
    banner: false,
    log: false,
  //  watch: false,
  //  cache: true,
  //  compress: true,
    onwatch: (livereload,watcher,file,evt)=>{
        console.log('Hello',watcher,file,evt);
        // livereload.prevent(); livereload.console('Hello');
        // livereload.prevent(); livereload.error('Error text','Build error');

    }
})
/*
app.use((req,res,next)=>{
    console.log('HELLO');
    next();
});


app.get('/hello/:name',(req,res,next)=>{
  console.log('HELLO2');
    res.writeHead(200);
    res.end('Hello,'+req.params.name+'!');
});

app.post('/jsontest',(req,res,next)=>{
    console.log(req.body);
    res.send({message: 'Hello '+req.body.name});
});

app.sub('/test',a => {
  a.get('/',(req,res,next)=>{
    console.log('HELLO4');
    next();
  })
  a.get('/:name',(req,res)=>{
    console.log('HELLO3');
    res.writeHead(200);
    res.end('Hello,'+req.params.name+'!');
  })
})
/*
const remote = createRemote('testname');
setTimeout(()=>remote.error('Hello from remote','Header here'),4000);
*/