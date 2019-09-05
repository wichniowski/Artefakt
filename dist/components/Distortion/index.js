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

var _ChannelStrip = require("../ChannelStrip");

var createDistortionCurve = function createDistortionCurve(amount) {
  var k = typeof amount === "number" ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;

  for (; i < n_samples; ++i) {
    x = i * 2 / n_samples - 1;
    curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
  }

  return curve;
};

var Distortion =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Distortion, _Component);

  function Distortion(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Distortion);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Distortion).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "waveshaper", void 0);
    var audioContext = context.audioContext,
        master = context.master;
    _this.waveshaper = audioContext.createWaveShaper();
    _this.waveshaper.curve = createDistortionCurve(props.amount);
    _this.waveshaper.oversample = "4x";

    _this.waveshaper.connect(master.gain); // @ts-ignore


    master.gain = _this.waveshaper;
    return _this;
  }

  (0, _createClass2.default)(Distortion, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_react.default.Fragment, null, this.props.children);
    }
  }]);
  return Distortion;
}(_react.Component);

Distortion.displayName = "Distortion";
(0, _defineProperty2.default)(Distortion, "propTypes", {
  frequency: _propTypes.default.number,
  amount: _propTypes.default.number
});
(0, _defineProperty2.default)(Distortion, "contextType", _ChannelStrip.ChannelContext);
(0, _defineProperty2.default)(Distortion, "defaultProps", {
  frequency: 1000,
  amount: 1
});
var _default = Distortion;
exports.default = _default;