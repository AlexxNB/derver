const { build } = require('esbuild');

const DEV = process.argv.includes('--dev');

build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "esm",
    outfile: './dist/tinds.esm.js',
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})

build({
    entryPoints: ['./src/index.js'],
    platform: 'node',
    format: "cjs",
    outfile: './dist/tinds.cjs.js',
    minify: !DEV,
    bundle: true,
}).catch((e) => {
    process.exit(1);
})