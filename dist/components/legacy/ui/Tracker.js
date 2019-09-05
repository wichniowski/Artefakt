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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Sequencer = _interopRequireDefault(require("../dsp/Sequencer"));

require("./Tracker.css");

var Tracker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Tracker, _Component);

  function Tracker() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Tracker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Tracker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      notes: _this.props.notes
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setNote", function (e, index) {
      if (!isNaN(parseFloat(e.target.value))) {
        var notes = _this.state.notes;
        notes[index] = parseInt(e.target.value);

        _this.setState({
          notes: notes
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleStep", function (clockCount, note) {
      _this.setState({
        activeStep: clockCount
      });

      _this.props.onStep(clockCount, _this.state.notes[clockCount]);
    });
    return _this;
  }

  (0, _createClass2.default)(Tracker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "tracker"
      }, _react.default.createElement("ul", {
        className: "tracker_list"
      }, this.props.notes.map(function (note, index) {
        return _react.default.createElement("li", {
          className: "tracker_list_item ".concat(_this2.state.activeStep === index ? "active" : ""),
          key: index
        }, _react.default.createElement("input", {
          min: 0,
          value: _this2.state.notes[index],
          onChange: function onChange(e) {
            return _this2.setNote(e, index);
          }
        }));
      })), _react.default.createElement(_Sequencer.default, {
        notes: this.state.notes,
        bpm: this.props.bpm,
        onStep: this.handleStep
      }, this.props.children));
    }
  }]);
  return Tracker;
}(_react.Component);

Tracker.displayName = "Tracker";
Tracker.defaultProps = {
  notes: [100, 200, 300, 400, 100, 200, 300, 400],
  onStep: function onStep() {}
};
var _default = Tracker;
exports.default = _default;