// Dependencies
import markedOwn from '../src';

import express from 'express';
import caravan from 'caravan';
import assert from 'power-assert';
import del from 'del';

// Environment
const cwd = `${__dirname}/fixtures/public`;
const port = 59798;
const base = `http://localhost:${port}`;

// Specs
describe('marked-own', () => {
  let server;
  before((done) => {
    const app = express();
    app.use(markedOwn(cwd));

    server = app.listen(port, done);
  });
  after((done) => {
    server.close(() => {
      del(`${cwd}/**/_cache`).then(() => done());
    });
  });

  it('', () => {
    const concurrency = 10;
    const urls = [];
    for (let i = 0; i < concurrency; i++) {
      urls.push(`${base}/`);
    }
    return caravan(urls, { concurrency })
    .progress((progress) => {
      assert.equal(progress.value, '<p><strong>要反省である</strong></p>');
    })
    .then((bodies) => {
      assert.equal(bodies.length, concurrency);
    });
  });
});
