# bettercap

This is a very simple bettercap API client.

It assumes that you have a global `fetch` command, so you will need to use a very new version of node, import something like node-fetch (and make it global) or deno or bun.

## installation

```sh
npm i bettercap cross-fetch
```

## usage

```js
import fetch from 'cross-fetch'
import Bettercap from 'bettercap'

globalThis.fetch = fetch

console.log(await bettercap.command('net.recon on'))
console.log(await bettercap.command('net.show'))
console.log(await bettercap.session())
```