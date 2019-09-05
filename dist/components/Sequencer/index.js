"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SequencerContext = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _tone = _interopRequireDefault(require("tone"));

var _ChannelStrip = require("../ChannelStrip");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SequencerContext = _react.default.createContext({
  onStep: function onStep(step) {},
  audioContext: null,
  master: null
});

exports.SequencerContext = SequencerContext;

var Sequencer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Sequencer, _Component);

  function Sequencer() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Sequencer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Sequencer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "transport", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "note", 100);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clockCount", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getNote", function () {
      if (_this.props.notes) {
        _this.note = _this.props.notes[_this.clockCount];
        _this.clockCount = _this.clockCount + 1 < _this.props.notes.length ? _this.clockCount + 1 : 0;
        return _this.note;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getAutomation", function () {
      if (_this.props.automation) {
        return Object.keys(_this.props.automation).map(function (key) {
          return (0, _defineProperty2.default)({}, key, _this.props.automation && _this.props.automation[key][_this.clockCount] || 0);
        }).reduce(function (cur, prev) {
          return _objectSpread({}, cur, {}, prev);
        }, {});
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onStep", function (callback) {
      if (_this.transport) {
        _tone.default.Transport.clear(_this.transport);
      }

      _this.transport = _tone.default.Transport.scheduleRepeat(function () {
        if (callback) {
          callback({
            note: _this.getNote(),
            automation: _this.getAutomation()
          });
        }
      }, _this.props.interval, "1m");
    });
    return _this;
  }

  (0, _createClass2.default)(Sequencer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _tone.default.Transport.start();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _tone.default.Transport.clear(this.transport);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(SequencerContext.Provider, {
        value: {
          onStep: function onStep(step) {
            return _this2.onStep(step);
          },
          audioContext: this.context.audioContext,
          master: this.context.master
        }
      }, this.props.children);
    }
  }]);
  return Sequencer;
}(_react.Component);

Sequencer.displayName = "Sequencer";
(0, _defineProperty2.default)(Sequencer, "propTypes", {
  notes: _propTypes.default.any.isRequired,
  automation: _propTypes.default.objectOf(_propTypes.default.any),
  interval: _propTypes.default.string
});
(0, _defineProperty2.default)(Sequencer, "contextType", _ChannelStrip.ChannelContext);
(0, _defineProperty2.default)(Sequencer, "defaultProps", {
  interval: "4n"
});
Sequencer.defaultProps = {
  interval: "4n"
};
var _default = Sequencer;
exports.default = _default;