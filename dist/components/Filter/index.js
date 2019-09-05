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

var _Sequencer = require("../Sequencer");

var Filter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Filter, _Component);

  function Filter(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Filter);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Filter).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "biquadFilter", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setAutomation", function (automation) {
      if (automation && automation.frequency) {
        _this.biquadFilter.frequency.value = automation.frequency;
      }
    });
    var frequency = props.frequency;
    var audioContext = context.audioContext,
        master = context.master;
    _this.biquadFilter = audioContext.createBiquadFilter();
    _this.biquadFilter.type = _this.props.type;
    _this.biquadFilter.frequency.value = frequency;

    _this.biquadFilter.connect(master.gain);

    master.gain = _this.biquadFilter;
    return _this;
  } // TODO: add automation type


  (0, _createClass2.default)(Filter, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Sequencer.SequencerContext.Consumer, null, function (value) {
        // Todo: Add step type
        value && value.onStep(function (step) {
          return _this2.setAutomation(step.automation);
        });
        return null;
      }), this.props.children);
    }
  }]);
  return Filter;
}(_react.Component);

Filter.displayName = "Filter";
(0, _defineProperty2.default)(Filter, "propTypes", {
  frequency: _propTypes.default.number.isRequired,
  type: _propTypes.default.oneOf(["lowpass", "highpass", "bandpass"])
});
(0, _defineProperty2.default)(Filter, "contextType", _ChannelStrip.ChannelContext);
(0, _defineProperty2.default)(Filter, "defaultProps", {
  type: "lowpass"
});
var _default = Filter;
exports.default = _default;