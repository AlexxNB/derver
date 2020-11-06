# Derver

Tiny Development Server for your web-applications with livereload and watchers


<p align="center">
  <img src="https://github.com/AlexxNB/derver/raw/main/demo.gif">
</p>

## Features

* Very tiny (~5kb)
* Livereload
* Watch directories with callback
* CLI or JS API
* Supports Gzip or Brotli compression
* Cache control
* Supports SPA mode

## CLI Usage

```sh
derver [parameters] [serve_directory]
```

You may use `npx derver` instantly  or install globally by `npm install -g derver` and then use comand `derver`.

To serve and watching curent directory just run:

```sh
derver
```

Server will run on [http://localhost:7000]() and site will be reloaded each time you change the file in the served directory.

By default server is running on `localhost` and nobody can access on the website from the network. Bind server on the `0.0.0.0` interface to allow network connections:

```sh
derver --host=0.0.0.0 public
```

In this example, `public` is a directory where are files for serving. By default it is current directory.

### List of possible parameters

#### `--host`
Interface, where bind the server. Use `0.0.0.0` inside docker or when need network connections to your site.
*Default: localhost*
*Example: --host=localhost*

#### `--port`
Port, where bind the server. 
*Default: 7000*
*Example: --port=8080*

#### `--index`
Name of the root file of web directory. Webserver will lookup this file when no file specified in the requested URL. 
*Default: index.html*
*Example: --index=index.htm*

#### `--watch`
Specify the directories for watching filechanges. Each time when files modified in theese directories, website will be reloaded. You may use this parameter multiple times to set more than one directory for watching.
*Default: watch the served directory*
*Example: --watch=dist/public --watch=src*

#### `--no-watch`
Add this parameter when you want to disable any watching and livereloading. 
*Example: --no-watch*

#### `--compress`
Will return files compressed by gzip or brotli, if client supports it.
*Example: --compress*

#### `--cache`
Add `Cache-control` header to the responce with `max-age` equal `31536000` (~1 year). You can specify number of seconds.
*Example: --cache*
*Example: --cache=3600*

#### `--spa`
Enables SPA (Single-Page Application) mode. All requested pages will be responced by index page in the application root, which is specified in `--index` parameter.
*Example: --spa*

## Javascript API

You may use Derver in the your scripts to get more power.

Install Derver as local dependency:

```
npm install derver
```

Then use `derver` function from the `derver` package to start the server. 

```js
import {derver} from 'derver';

derver();
```

By default, server will be started on [http://localhost:7000]() and serving `public` directory on your workdir.

### Configuration

You may set configuration object as a parameter of the `derver` function. Below you find all possible options:

#### `dir` *string*
Directory which contains files for serving. If nothing set in `watch` option, it will be watching for changes also.

*Default: public*

*Example: dir: 'public'*

---

#### `host` *string*
Interface, where bind the server. Use `0.0.0.0` inside docker or when need network connections to your site.

*Default: localhost*

*Example: host: 'localhost'*

---

#### `port` *number*
Port, where bind the server. 

*Default: 7000*

*Example: port: 8080*

---

#### `index`  *string*
Name of the root file of web directory. Webserver will lookup this file when no file specified in the requested URL. 

*Default: index.html*

*Example: index: 'index.htm'*

---

#### `compress` *boolean*
Will return files compressed by gzip or brotli, if client supports it.

*Default: false*

*Example: compress: true*

---

#### `cache` *boolean*|*number*
Add `Cache-control` header to the responce with `max-age` equal `31536000` (~1 year). You can specify number of seconds.

*Default: false*

*Example: cache: true*
*Example: cache: 3600*

---

#### `spa` *boolean*
Enables SPA (Single-Page Application) mode. All requested pages will be responced by index page in the application root, which is specified in `index` option.

*Default: false*

*Example: spa: true*

---

#### `watch` *string*|*array of string*
Specify the directories for watching filechanges. Each time when files modified in theese directories, website will be reloaded and `onwatch` callback will be run. By default will be watched directory defined in `dir` option.

*Default: null*

*Example: watch: ['dist/public','src']*

---

#### `onwatch` *function*
This function will be called when any file changes in watched directories.

*Default: null*

*Example: onwatch: (liverload,watchitem)=>{if(watchitem == 'src') livereload.prevent()})*

---

### `onwatch`-callback arguments

*Callback signature: (livereload,watchitem,filename,eventname)*

#### `livereload`
It is object with following methods:

* `livereload.prevent()` - Will stop sheduled livereload action for this watch event.
* `livereload.reload()` - Run each time you want to reload page in the browser.
* `livereload.console(message)` - Send a `message` to the browser console.
* `livereload.error(message,[header])` - Show error modal on client.

---

#### `watchitem`
It is a string with directory name where were fired filechange event. It is same string as you specified in `watch` option(or in `dir` option, if `watch` not set).

---

#### `filename`
Full path of changed file (unstable)

---

#### `eventname`
What exactly happened with modified file. 


## How livereload works

When you changes file in the watching directory, server will send command to the client side to reload current page. It is musthave feature when you developing web-application and want to see changes immideatly.

Livereload made with [Server Side Events API](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events). It is perfect feature for one-way communication server with client based only on http protocol. It is why Derver is so tiny, no need to implement websocket communication as others known servers do.

Some JavaScript code for livereload will be added before `</body>` element inside each requested `html` file.