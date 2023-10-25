"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _routes = _interopRequireDefault(require("../routes"));
var _chatbot = _interopRequireDefault(require("../routes/chatbot"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(app) {
  app.use('/', _routes.default);
  app.use('/chatbot', _chatbot.default);
}