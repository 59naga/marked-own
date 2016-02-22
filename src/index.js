// Dependencies
import express from 'express';
import markedOwn from './marked-own';

// Public
export default (cwd = process.cwd, options = {}) => {
  const middleware = express.Router();

  middleware.use(markedOwn(cwd, options));

  return middleware;
};
