import {derver as server} from './../..';

export function derver(options){
    let first = true;
    return {
        name: 'rollup-plugin-derver',
        generateBundle () {
            if (!first) return;
            first = !first;
            server(options);
        }
    }
}