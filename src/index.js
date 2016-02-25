// Dependencies
import express from 'express';
import middleware from './middleware';
import stylus from 'stylus';

// Public
export default (cwd = process.cwd(), options = {}) => {
  const markedOwn = express.Router();

  markedOwn.use(middleware(cwd, options));

  const layoutDir = options.layoutDir || `${cwd}/_layout/`;
  const cacheDir = options.cacheDir || `${cwd}/_cache/`;
  markedOwn.use(stylus.middleware({
    src: layoutDir,
    dest: cacheDir,
    compile: (str, path) => {
      const compiler = stylus(str)
        .set('filename', path)
        .set('compress', true);

      if (options.use) {
        return options.use.split(',').reduce((compilerWithPlugin, plugin) => (
          compilerWithPlugin.use(require(plugin)())
        ), compiler);
      }

      return compiler;
    },
  }));
  markedOwn.use(express.static(cacheDir));
  markedOwn.use(express.static(cwd));

  return markedOwn;
};
