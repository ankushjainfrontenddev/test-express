"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = exports.healthCheck = void 0;
/**
 * GET /
 * Home page
 */
const index = (req, res) => res.send('Hello World!');

/**
 * GET /health
 * Health check
 */
exports.index = index;
const healthCheck = (req, res) => res.json({
  success: true
});
exports.healthCheck = healthCheck;