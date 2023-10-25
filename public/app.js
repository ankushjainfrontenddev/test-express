"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _express = _interopRequireDefault(require("express"));
var _compression = _interopRequireDefault(require("compression"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var configs = _interopRequireWildcard(require("./config"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  NODE_ENV
} = process.env;
const app = (0, _express.default)();

// Required middleware list
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cors.default)(configs.corsConfig));

// // Define a custom CORS middleware to allow only the specified origin
// app.use(cors({
//   origin: (origin, callback) => {
//     if (origin === process.env.CORS_ALLOWED_ORIGIN || !process.env.CORS_ALLOWED_ORIGIN) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));
app.use((0, _compression.default)(configs.compressionConfig));
app.use((0, _cookieParser.default)());

// Load router paths
configs.routerConfig(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next((0, _httpErrors.default)(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('---->', err);
  res.status(err.status || 500).json(err);
});
var _default = exports.default = app;