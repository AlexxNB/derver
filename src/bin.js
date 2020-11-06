#!/usr/bin/env node
import {derver} from './../dist/derver.cjs.js';
import {retrieveParams,exit,getUsageText} from './lib/bin';

const input = retrieveParams();

if(!input || input.params.help) {
    console.log(getUsageText());
    exit();
}

let options = {};

if(input.dir) options.dir = input.dir;
if(input.params.host) options.port = input.params.host;
if(input.params.port) options.port = Number(input.params.port);
if(input.params.index) options.index = input.params.index;
if(input.params.watch) options.index = input.params.watch;
if(input.params['no-watch']) options.watch = false;
if(input.params.spa) options.spa = true;
if(input.params.compress) options.compress = true;
if(input.params.cache) options.cache = input.params.cache === true ? true : Number(input.params.cache);

derver(options);