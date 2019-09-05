"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var BufferLoader = function BufferLoader(context, urlList, callback) {
  var _this = this;

  (0, _classCallCheck2.default)(this, BufferLoader);
  (0, _defineProperty2.default)(this, "context", void 0);
  (0, _defineProperty2.default)(this, "urlList", void 0);
  (0, _defineProperty2.default)(this, "onLoad", void 0);
  (0, _defineProperty2.default)(this, "bufferList", void 0);
  (0, _defineProperty2.default)(this, "loadCount", void 0);
  (0, _defineProperty2.default)(this, "loadBuffer", function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      _this.context.decodeAudioData(request.response, function (buffer) {
        if (!buffer) {
          alert("error decoding file data: " + url);
          return;
        }

        _this.bufferList[index] = buffer;
        if (++_this.loadCount === _this.urlList.length) _this.onLoad(_this.bufferList);
      }, function (error) {
        console.error("decodeAudioData error", error);
      });
    };

    request.onerror = function () {
      alert("BufferLoader: XHR error");
    };

    request.send();
  });
  (0, _defineProperty2.default)(this, "load", function () {
    for (var i = 0; i < _this.urlList.length; ++i) {
      _this.loadBuffer(_this.urlList[i], i);
    }
  });
  this.context = context;
  this.urlList = urlList;
  this.onLoad = callback;
  this.bufferList = [0];
  this.loadCount = 0;
};

var _default = BufferLoader;
exports.default = _default;