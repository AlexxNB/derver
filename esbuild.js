const { build } = require('esbuild');

const DEV = process.argv.includes('--dev');

// ES-module
build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "esm",
    outfile: './dist/derver.esm.js',
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

//Node-module
build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "cjs",
    outfile: './dist/derver.cjs.js',
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

//Bin
build({
    entryPoints: ['./src/bin.js'],
    platform: 'node',
    format: "cjs",
    outfile: './bin/derver',
    minify: !DEV,
    bundle: true,
    external: ['./dist/derver.cjs.js']
}).catch((e) => {
    process.exit(1);
})