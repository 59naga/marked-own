// Dependencies
import Bluebird from 'bluebird';

import fsOrigin from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import marked from 'marked';
import cheerio from 'cheerio';
import jade from 'jade';

// Module enhancement
const fs = Bluebird.promisifyAll(fsOrigin);
const mkdirpAsync = Bluebird.promisify(mkdirp);
const markedAsync = Bluebird.promisify(marked);

// Public
export default (cwd = process.cwd, options = {}) => {
  const isDebug = process.env.NODE_ENV !== 'production';
  const pendingCaches = {};

  return (req, res, next) => {
    let filePath = req.url.slice(1);
    if (filePath === '' || filePath.match(/\/$/)) {
      filePath += 'index';
    }
    const fileName = `${cwd}/${filePath}.md`;
    const cacheName = `${cwd}/_cache/${filePath}.html`;
    const layoutName = `${cwd}/_layout/default.jade`;

    const notFound = fs.existsSync(fileName) === false;
    const useCache = fs.existsSync(cacheName) && !isDebug;
    const needCache = pendingCaches[cacheName] === undefined;
    if (notFound) {
      return next();
    }
    if (useCache) {
      return res.sendFile(cacheName);
    }
    if (needCache) {
      pendingCaches[cacheName] = fs.readFileAsync(fileName)
      .then((data) => (
        markedAsync(data.toString(), options)
      ))
      .then((content) => {
        const $ = cheerio.load(content);
        const title = 'marked-own';

        // markdownの最初の文字を標題として使用する
        const subtitle = $('*:first-child').eq(0).text();

        return fs.readFileAsync(layoutName)
        .then((layout) => jade.render(layout, {
          title,
          heading: `${subtitle} - ${title}`,
          content: content.trim(),
          pretty: isDebug,
        }))
        .catch(() => content.trim());
      })
      .then((cache) => (
        mkdirpAsync(path.dirname(cacheName))
        .then(() => fs.writeFileAsync(cacheName, cache))
        .then(() => cache)
      ));
    }

    return pendingCaches[cacheName].then((cache) => {
      res.set('content-type', 'text/html');
      res.end(cache);

      if (isDebug) {
        delete pendingCaches[cacheName];
      }
    });
  };
};
