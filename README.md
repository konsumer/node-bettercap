# bettercap

This is a very simple bettercap API client.

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

You can leave out the fetch polyfill if you run with `node --experimental-fetch`, '[deno](https://deno.land/) --allow-net', or [bun](https://bun.sh/):

```js
// for bun
import Bettercap from 'bettercap'

// for deno
import Bettercap from 'npm:bettercap'

console.log(await bettercap.command('net.recon on'))
console.log(await bettercap.command('net.show'))
console.log(await bettercap.session())
```
