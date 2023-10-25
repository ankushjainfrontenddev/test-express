"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var chatbotController = _interopRequireWildcard(require("../controllers/chatbot"));
var homeController = _interopRequireWildcard(require("../controllers/home"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();
router.get('/health', homeController.healthCheck);
router.get('/getresponse', chatbotController.getResponse);
router.post('/get-response', chatbotController.getResponse);
router.post('/create-user', chatbotController.cretaeUser);
// router.route('/')
//     .get(isAuthenticated, validate(tweetValidations.listTweetsRules), chatbotController.getTweets)
//     .post(isAuthenticated, validate(tweetValidations.createTweetRules), chatbotController.createTweet);

// router.route('/:id')
//     .get(cache('Tweet', 'req.params.id'), tweetController.getTweetById)
//     .delete(isAuthenticated, tweetController.deleteTweet);
var _default = exports.default = router;