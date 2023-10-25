"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "compressionConfig", {
  enumerable: true,
  get: function () {
    return _compression.default;
  }
});
Object.defineProperty(exports, "corsConfig", {
  enumerable: true,
  get: function () {
    return _cors.default;
  }
});
Object.defineProperty(exports, "routerConfig", {
  enumerable: true,
  get: function () {
    return _router.default;
  }
});
var _cors = _interopRequireDefault(require("./cors"));
var _router = _interopRequireDefault(require("./router"));
var _compression = _interopRequireDefault(require("./compression"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }