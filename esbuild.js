const { build } = require('esbuild');

build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "esm",
    outfile: './dist/tinds.esm.js',
    minify: true,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "cjs",
    outfile: './dist/tinds.cjs.js',
    minify: true,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})