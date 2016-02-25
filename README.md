Marked-own
---

<p align="right">
  <a href="https://npmjs.org/package/marked-own">
    <img src="https://img.shields.io/npm/v/marked-own.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/marked-own">
    <img src="http://img.shields.io/travis/59naga/marked-own.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/marked-own/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/marked-own.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/marked-own">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/marked-own.svg?style=flat-square">
  </a>
</p>

> (WIP) Markdown publishing server.

CLI
---

```bash
npm install marked-own --global
```

# `mo` Command

```md
<!-- index.md -->
**Hello marked-own**

```

```bash
tree .

# .
# └── index.md
mo
#  ______              _             _
# |  ___ \            | |           | |
# | | _ | | ____  ____| |  _ ____ _ | |___ ___  _ _ _ ____
# | || || |/ _  |/ ___) | / ) _  ) || (___) _ \| | | |  _ \
# | || || ( ( | | |   | |< ( (/ ( (_| |  | |_| | | | | | | |
# |_||_||_|\_||_|_|   |_| \_)____)____|   \___/ \____|_| |_|
#
#                 http://localhost:59798
curl "http://localhost:59798" # or "http://localhost:59798/index"
# <p><strong>Hello marked-own</strong></p>
```

`mo --help` check the list of options.

API
---

```bash
npm install marked-own --save
```

## markedOwn(cwd) -> middleware

Response the compiled html if the `.md` matches the `req.url`.

```bash
tree .

# .
# └── index.md
babel-node server.js
# boot on http://localhost:59798
curl "http://localhost:59798" # or "http://localhost:59798/index"
# <p><strong>Hello marked-own</strong></p>
```

```js
// server.js
import express from 'express';
import markedOwn from 'marked-own';

const port = 59798;

const app = express();
app.use(markedOwn(__dirname));
app.listen(port, () => {
  console.log(`boot on http://localhost:${port}`);
});
```

Test
---
```bash
git clone https://github.com/59naga/marked-own.git
cd marked-own

npm install
npm test
```

License
---
[MIT](http://59naga.mit-license.org/)