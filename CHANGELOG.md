# Derver changelog

## unreleased

### Other

- Merge branch 'main' of github.com:AlexxNB/derver [`04ddf9fd`](https://github.com/AlexxNB/derver/commit/04ddf9fd2570970f3ea7299ad194ed40c05541fe)

## 0.5.2 - 2021-11-06

### Features

- Preserve scroll position on reload [`483cc95a`](https://github.com/AlexxNB/derver/commit/483cc95ac5a9877976c104cd9ef79ba9eb6f3113)

### Other

- Merge branch 'main' of github.com:AlexxNB/derver [`e26d23c7`](https://github.com/AlexxNB/derver/commit/e26d23c79a01ae5cd2b08dace8a406bcd3be5633)

## 0.5.1 - 2021-11-01

### Bug Fixes

- 🐛 Add exports for main and module also [`efaccc30`](https://github.com/AlexxNB/derver/commit/efaccc307a062ae5394edebfe46f458771636c76)

### Other

- Merge branch 'main' of github.com:AlexxNB/derver [`6cb79cb4`](https://github.com/AlexxNB/derver/commit/6cb79cb444efa9aba36fce0fcfa20ddebde62040)

## 0.4.20 - 2021-10-30

### Other

- make rollup-plugin universal fo cjs and esm consumers [`48f130b6`](https://github.com/AlexxNB/derver/commit/48f130b6a6fbfcdbe7ad5b678afcb7905917f1a0)
- Merge branch 'main' of github.com:AlexxNB/derver into main [`3779af12`](https://github.com/AlexxNB/derver/commit/3779af128dd0a67bf42ec5926834ba2afbc04159)

## 0.4.19 - 2021-09-01

### Features

- Add options to prevent console trashing [`6883c207`](https://github.com/AlexxNB/derver/commit/6883c207d93c82638000a73f3696d23e5bb88a44)

## 0.4.18 - 2021-09-01

### Features

- Ability to run only middlewares when dir option is false [`1c3c5bc1`](https://github.com/AlexxNB/derver/commit/1c3c5bc1a813369fca2338b9398f01e8e9a48bfb)

### Other

- Merge branch 'main' of github.com:AlexxNB/derver into main [`082778e8`](https://github.com/AlexxNB/derver/commit/082778e8fc04c59de3eaca59dc6bd6ab3475f7bd)

## 0.4.17 - 2021-06-28

### Features

- Add JSON handling in middlewares [`f967e600`](https://github.com/AlexxNB/derver/commit/f967e600240397155148ae9a0ca23754ebb7e81c)

### Other

- Merge branch 'main' of github.com:AlexxNB/derver into main [`554a0eb8`](https://github.com/AlexxNB/derver/commit/554a0eb89f1c7407316dfb76016cb943a53de207)

## 0.4.16 - 2021-06-12

### Documentation

- 📝 Fix some mistakes [`cbc6d30e`](https://github.com/AlexxNB/derver/commit/cbc6d30eb5f5bc61190df6e8238a4c003ecda927)

### Other

- Merge branch 'main' of github.com:AlexxNB/derver into main [`0b76ccdf`](https://github.com/AlexxNB/derver/commit/0b76ccdfda9bdef2440b089706e860ce8a10ccce)
- update dapendencies [`21174900`](https://github.com/AlexxNB/derver/commit/21174900c30c804640dbd97bc2b07664374e50db)

## 0.4.15 - 2021-05-02

### Features

- Allow nested index fallbaks in SPA mode [`16e52070`](https://github.com/AlexxNB/derver/commit/16e52070e992cd252171099aeba12bcf0d419d7d)

    *If there is some sub directory contents index.html then unexistent URL with first part matched this subdirectory will fallback to this index file instead root one.*

### Bug Fixes

- 🐛 Last param from URL contents also a query part [`10c775ec`](https://github.com/AlexxNB/derver/commit/10c775ec9bd4968564d21212b9db77886ec4c11d)

## 0.4.14 - 2021-03-20

### Bug Fixes

- 🐛 Livereload doesn't work when no watchers, but uses remote. ([#1](https://github.com/AlexxNB/derver/issues/1)) [`dc79b251`](https://github.com/AlexxNB/derver/commit/dc79b251f1d518dc6c0a22a25cdae558f2e6ed84)

    *fix [#1](https://github.com/AlexxNB/derver/issues/1)*

## 0.4.13 - 2021-03-10

### Other

- fix 404 with query add usful data to request object [`226450e5`](https://github.com/AlexxNB/derver/commit/226450e5460c3db28951a2b38622a1f46aaf8c16)

## 0.4.12 - 2021-01-22

### Other

- dartheme for error modal [`a3e6214f`](https://github.com/AlexxNB/derver/commit/a3e6214fa548fa4ce23e3f26c42265a055605df3)

## 0.4.11 - 2021-01-21

### Other

- show modal when server down [`0c780542`](https://github.com/AlexxNB/derver/commit/0c7805429bf4e12cdcc9e5cdd7f01de14caea92e)

## 0.4.10 - 2021-01-21

### Other

- get remote config in each request [`fa781f69`](https://github.com/AlexxNB/derver/commit/fa781f69d81089f4b482f141e6668c16e4830ea5)

## 0.4.9 - 2021-01-21

### Other

- add remote server ID option [`809f22df`](https://github.com/AlexxNB/derver/commit/809f22dfd920e36767a8225fc7108b510abad760)

## 0.4.8 - 2021-01-21

### Other

- add remote control [`a815b00b`](https://github.com/AlexxNB/derver/commit/a815b00be5c735d3944047719fa3eeacafa0d2be)

## 0.4.7 - 2021-01-16

### Other

- fix nesting [`9a79fc26`](https://github.com/AlexxNB/derver/commit/9a79fc2644f868f6a7b7a6b7ea06d8613e356500)

## 0.4.6 - 2021-01-16

### Other

- add nested middlewares [`ab208b25`](https://github.com/AlexxNB/derver/commit/ab208b256f0f3fac59228ce03f30516af731e9bf)

## 0.4.5 - 2021-01-13

### Other

- fix middlewares wrong order [`fcbea885`](https://github.com/AlexxNB/derver/commit/fcbea885d696956f1c88cbd37d1e8f3c70374733)

## 0.4.4 - 2021-01-13

### Other

- fix chaining [`7b16b249`](https://github.com/AlexxNB/derver/commit/7b16b2498e469bab07c382910e773735c3cd6bd9)

## 0.4.3 - 2021-01-12

### Other

- debounce watch log [`b79943de`](https://github.com/AlexxNB/derver/commit/b79943deb4939be8ac2c6bdac7c3b686f48db6bc)

## 0.4.2 - 2021-01-12

### Other

- close watchers on exit [`701aa4e9`](https://github.com/AlexxNB/derver/commit/701aa4e9623a1ba43c4ba9d74a1bebadf91c2afa)

## 0.4.1 - 2021-01-12

### Other

- stop server on process exit [`91802948`](https://github.com/AlexxNB/derver/commit/9180294806ff3e8c352c403ab005aa6cc3676471)

## 0.4.0 - 2021-01-12

### Other

- add middlewares [`d80449e6`](https://github.com/AlexxNB/derver/commit/d80449e6387ae79f4e648e0b8015de859edbaad0)

## 0.3.0 - 2020-11-18

### Other

- fix livereload url [`4b2179df`](https://github.com/AlexxNB/derver/commit/4b2179df512959e03d2c63b518bb99e6380bfdb6)
- use node-watch instead fs.watch [`fb4260b7`](https://github.com/AlexxNB/derver/commit/fb4260b780c5f74c22b924f4d76a31f779e467cf)

## 0.2.2 - 2020-11-14

### Other

- add rollup plugin [`9617f935`](https://github.com/AlexxNB/derver/commit/9617f935eb6dbbf1f82938929e134768eb26b8fe)

## 0.2.1 - 2020-11-07

### Other

- fix livereload [`c9206ceb`](https://github.com/AlexxNB/derver/commit/c9206ceb803e50c21afaca6c1b8c3424a9a5fdd9)

## 0.2.0 - 2020-11-06

### Other

- fix dist size [`384563d5`](https://github.com/AlexxNB/derver/commit/384563d53b4b326db17d267199da2168d88751f5)
- add production mode [`54053370`](https://github.com/AlexxNB/derver/commit/540533701fc53fdd7eeb6c2a96e5194fece808da)
- add server header [`595bd82f`](https://github.com/AlexxNB/derver/commit/595bd82fd9159b791f2687bd317147a7b2af449b)
- add spa mode [`a4b8d98b`](https://github.com/AlexxNB/derver/commit/a4b8d98b0485e4fab7332285abe1616731fa541a)
- add cache control [`257d06cc`](https://github.com/AlexxNB/derver/commit/257d06cc8ed4955d940cebc6a0a45a86a743a9ae)
- add compression support [`0c727c3d`](https://github.com/AlexxNB/derver/commit/0c727c3d436d44d422ec52df4fe7b199ca9a0f58)
- refactor middlewares [`1d1c893d`](https://github.com/AlexxNB/derver/commit/1d1c893dc4ccf3fb320f9ae97a3f1d6b1e101658)

## 0.1.6 - 2020-11-05

### Other

- fix URL [`b6563bb2`](https://github.com/AlexxNB/derver/commit/b6563bb27d856233c8705f3b86c49b96996daa64)

## 0.1.5 - 2020-11-05

### Other

- add gif [`a2ecbc68`](https://github.com/AlexxNB/derver/commit/a2ecbc68168fa9aad603ceda9e8b581b2bc4ab63)

## 0.1.4 - 2020-11-05

### Other

- fix readme [`eea9c9a0`](https://github.com/AlexxNB/derver/commit/eea9c9a0e24cb3489d914e65e18c6e3032840e7b)
- add error modal [`1a76777d`](https://github.com/AlexxNB/derver/commit/1a76777de9d163b00dafcb432962fb1a33163659)

## 0.1.3 - 2020-11-03

### Other

- add livereload.console method [`dd9b5d05`](https://github.com/AlexxNB/derver/commit/dd9b5d05a120f897bbd05d876a8e9dd7f463cace)

## 0.1.2 - 2020-11-03

### Other

- fix bin path [`3373db20`](https://github.com/AlexxNB/derver/commit/3373db202f34f5396171edd5cdcb00d151c03d96)

## 0.1.1 - 2020-11-03

### Other

- fix repo [`b8415e5e`](https://github.com/AlexxNB/derver/commit/b8415e5e3a70963a65dc7c5a138cbe20d9c916ab)
- fix formatting [`e38ff2e4`](https://github.com/AlexxNB/derver/commit/e38ff2e479710bb7b44af108e85fa7e4cb1d5bb3)
- add publish workflow [`12e75eee`](https://github.com/AlexxNB/derver/commit/12e75eeeaf7bc6199648e94d725031ecdb0e2b4a)
- fix [`a8cdb039`](https://github.com/AlexxNB/derver/commit/a8cdb0398a317f5a5980a755691974a1fa59a89d)
- add readme [`43e5601c`](https://github.com/AlexxNB/derver/commit/43e5601cd49e1867658aa80e0b3dec9e70992201)
- add bin [`8906e54b`](https://github.com/AlexxNB/derver/commit/8906e54b6e81bd76602480e9ee6dba383273f7c8)
- autoreconnection for livereload [`77274ee1`](https://github.com/AlexxNB/derver/commit/77274ee16f4db4e19204663fed03dfa2fa515b55)
- make onwatch asyncable [`0748ba69`](https://github.com/AlexxNB/derver/commit/0748ba697b4cfb25d80a2b951afa70504e9a896c)
- add onwatch property [`e339482a`](https://github.com/AlexxNB/derver/commit/e339482a92c282ca44a71466f89e74bfee03ede4)
- more beutiful output [`fe069db4`](https://github.com/AlexxNB/derver/commit/fe069db42e7bf9a75c19ea3b6715dfc1fba9857c)
- colorful output [`bd123a2a`](https://github.com/AlexxNB/derver/commit/bd123a2a7ece834d37f58784df348c2df9936999)
- made liverload [`77bbbb2f`](https://github.com/AlexxNB/derver/commit/77bbbb2f238765f359e222f1b892dc8edb8643cb)
- add js injector [`c2105994`](https://github.com/AlexxNB/derver/commit/c21059946193bfe6dbaaaa200c8746e914453b2e)
- rearrange config [`25c4192f`](https://github.com/AlexxNB/derver/commit/25c4192ff318d1d286de546dd2b6950eefbf9517)
- make lib [`af79434a`](https://github.com/AlexxNB/derver/commit/af79434a1e5a6b1fa5e83cce5a40924988f8564e)
- add debouncer [`8e0827c4`](https://github.com/AlexxNB/derver/commit/8e0827c4029a506ba39828eb05918acbfd6d43d4)
- add watcher [`61de3da7`](https://github.com/AlexxNB/derver/commit/61de3da7e64d19d0dacf7589c38c339db13cb6a8)
- initial commit [`1efced54`](https://github.com/AlexxNB/derver/commit/1efced541bc5948407d41f0473b3747cd956a396)
- Initial commit [`5b9824df`](https://github.com/AlexxNB/derver/commit/5b9824df0e5e9d00b26bfc291e6270561f09fe67)