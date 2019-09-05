"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _BufferLoader = _interopRequireDefault(require("../../core/BufferLoader"));

var _Sequencer = require("../Sequencer");

var Sampler =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Sampler, _Component);

  function Sampler(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Sampler);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Sampler).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "bufferLoader", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buffer", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "source", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "finishedLoading", function (buffer) {
      _this.source = _this.context.audioContext.createBufferSource(); // @ts-ignore

      _this.source.buffer = buffer[0];

      _this.source.connect(_this.context.master.gain);
    });
    _this.bufferLoader = new _BufferLoader.default(context.audioContext, [props.sample], function (buffer) {
      _this.buffer = buffer;

      _this.finishedLoading(buffer);

      _this.context.onStep(function (step) {
        if (step.note !== 0) {
          _this.play(_this.buffer);
        }
      });
    });

    _this.bufferLoader.load();

    return _this;
  }

  (0, _createClass2.default)(Sampler, [{
    key: "play",
    value: function play(buffer) {
      this.finishedLoading(buffer);
      this.source.start(0);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return Sampler;
}(_react.Component);

Sampler.displayName = "Sampler";
(0, _defineProperty2.default)(Sampler, "propTypes", {
  sample: _propTypes.default.string.isRequired
});
(0, _defineProperty2.default)(Sampler, "contextType", _Sequencer.SequencerContext);
var _default = Sampler;
exports.default = _default;