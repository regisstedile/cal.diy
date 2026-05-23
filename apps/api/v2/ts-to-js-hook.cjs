'use strict';

// Intercept require() calls to .ts files and redirect to .js
const Module = require('node:module');
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function(request, parent, isMain, options) {
  if (request.endsWith('.ts')) {
    const jsRequest = request.replace(/\.ts$/, '.js');
    try {
      return originalResolve.call(this, jsRequest, parent, isMain, options);
    } catch {
      // Fall through to original resolution
    }
  }
  return originalResolve.call(this, request, parent, isMain, options);
};
