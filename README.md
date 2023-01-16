<img src="https://user-images.githubusercontent.com/441546/129864814-5bec7f3f-44a7-4e74-9d40-83ec600da0d4.png" style="max-width: 100%" />
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/fd-name"><img src="https://img.shields.io/npm/v/@darkobits/fd-name.svg?style=flat-square&color=398AFB"></a>
  <a href="https://github.com/darkobits/fd-name/actions?query=workflow%3Aci"><img src="https://img.shields.io/github/actions/workflow/status/darkobits/fd-name/ci.yml?style=flat-square"></a>
  <a href="https://depfu.com/github/darkobits/fd-name"><img src="https://img.shields.io/depfu/darkobits/fd-name?style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"></a>
</p>

Backwards-compatible replacement for `__filename` / `__dirname` in ESM environments.

# Install

```
npm install @darkobits/fd-name
```

This package is a hybrid module that exports ESM and CJS. If you are authoring ESM, CJS, or more likely
authoring ESM-like syntax that is being transpiled to CJS, you can use this package today and transition
to pure ESM in the future with no breaking changes. ✨

# Use

> `/foo/bar/unicorns.js`

```js
import { filename, dirname } from '@darkobits/fd-name';

filename() //=> '/foo/bar/unicorns.js'
dirname() //=> '/foo/bar'
```

This is a bit less awkward than:

```js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

Which has to be repeated in every file you want to use these values in, as `import.meta` is specific to
the local module.

**⚠️ Note:** This package removes the `file://` protocol prefix from paths in ESM as most tooling does
not play nicely with it, including the built-in `path` module.

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
