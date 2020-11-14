import {derver} from './../../dist/derver.cjs.js';

export default function(options){
    let first = true;
    return {
        name: 'rollup-plugin-derver',
        generateBundle () {
            if (!first) return;
            first = !first;
            derver(options);
        }
    }
}