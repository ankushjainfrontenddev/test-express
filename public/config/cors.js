"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  origin: '*',
  // process.env.CORS_ALLOWED_ORIGIN,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
  exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token']
};