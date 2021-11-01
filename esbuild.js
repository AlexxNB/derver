const { build } = require('esbuild');
const pkg = require('./package.json');

const DEV = process.argv.includes('--dev');

(async ()=>{
    try{
        // ES-module
        await build({
            entryPoints: ['./src/index.js'],
            platform: 'node',
            format: "esm",
            outfile: pkg.module,
            minify: !DEV,
            bundle: true,
        });

        //Node-module
        await build({
            entryPoints: ['./src/index.js'],
            platform: 'node',
            format: "cjs",
            outfile: pkg.main,
            minify: !DEV,
            bundle: true,
        });

        //Bin
        await build({
            entryPoints: ['./src/bin.js'],
            platform: 'node',
            format: "cjs",
            outfile: pkg.bin.derver,
            minify: !DEV,
            bundle: true,
            external: [pkg.main]
        });

        //Rollup plugin
        await build({
            entryPoints: ['./src/plugins/rollup.js'],
            platform: 'node',
            format: "cjs",
            outfile: pkg.exports['./rollup-plugin'],
            minify: !DEV,
            bundle: true,
            external: ['.']
        });
    }catch(err){
        console.log(err);
        process.exit(1);
    }
})();