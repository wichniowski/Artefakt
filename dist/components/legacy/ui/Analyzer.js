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

var Analyzer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Analyzer, _Component);

  function Analyzer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Analyzer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Analyzer).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "analyser", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "bufferLength", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "dataArray", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "canvasContext", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "canvas", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "draw", function () {
      var _this$props$canvasDim = _this.props.canvasDimensions,
          width = _this$props$canvasDim.width,
          height = _this$props$canvasDim.height;
      requestAnimationFrame(_this.draw);

      _this.analyser.getByteTimeDomainData(_this.dataArray);

      _this.canvasContext.fillStyle = "rgb(0, 0, 0)";

      _this.canvasContext.fillRect(0, 0, width, height);

      _this.canvasContext.lineWidth = 2;
      _this.canvasContext.strokeStyle = "rgb(255, 255, 255)";

      _this.canvasContext.beginPath();

      var sliceWidth = width * 1.0 / _this.bufferLength;
      var x = 0;

      for (var i = 0; i < _this.bufferLength; i++) {
        var v = _this.dataArray[i] / 128.0;
        var y = v * height / 2;

        if (i === 0) {
          _this.canvasContext.moveTo(x, y);
        } else {
          _this.canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      _this.canvasContext.lineTo(width, height / 2);

      _this.canvasContext.stroke();
    });
    _this.analyser = props.audioContext.createAnalyser();
    props.masterGain.connect(_this.analyser);
    _this.analyser.fftSize = 2048;
    _this.bufferLength = _this.analyser.frequencyBinCount;
    _this.dataArray = new Uint8Array(_this.bufferLength);
    return _this;
  }

  (0, _createClass2.default)(Analyzer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.canvasContext = this.canvas.getContext("2d");
      this.draw();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("canvas", {
        width: this.props.canvasDimensions.width,
        height: this.props.canvasDimensions.height,
        ref: function ref(_ref) {
          _this2.canvas = _ref;
        }
      });
    }
  }]);
  return Analyzer;
}(_react.Component);

Analyzer.displayName = "Analyzer";
(0, _defineProperty2.default)(Analyzer, "propTypes", {
  canvasDimensions: _propTypes.default.shape({
    width: _propTypes.default.number.isRequired,
    height: _propTypes.default.number.isRequired
  }),
  audioContext: _propTypes.default.any.isRequired,
  masterGain: _propTypes.default.any.isRequired
});
(0, _defineProperty2.default)(Analyzer, "defaultProps", {
  canvasDimensions: {
    width: document.body.clientWidth,
    height: 100
  }
});
Analyzer.defaultProps = {
  canvasDimensions: {
    width: document.body.clientWidth,
    height: 100
  }
};
var _default = Analyzer;
exports.default = _default;