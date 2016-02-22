import express from 'express';
import middleware from '../../src';
import stylus from 'stylus';
import koutoSwiss from 'kouto-swiss';

const cwd = __dirname;
const port = 59798;

const app = express();
app.use(middleware(cwd));
app.use(stylus.middleware({
  src: `${cwd}/_layout/`,
  dest: `${cwd}/`,
  compile: (str, path) => (
    stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(koutoSwiss())
    .import('kouto-swiss')
  ),
}));
app.use(express.static(cwd));
app.listen(port, () => {
  console.log('boot on localhost');
});
