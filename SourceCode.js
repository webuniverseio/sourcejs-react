'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceCode = function () {
    function SourceCode() {
        _classCallCheck(this, SourceCode);
    }

    _createClass(SourceCode, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'code',
                { className: 'src-html ' + this.props.extraClasses },
                this.props.children
            );
        }
    }]);

    return SourceCode;
}();

SourceCode.displayName = 'SourceCode';

SourceCode.propTypes = {
    children: _propTypes2.default.element.isRequired,
    extraClasses: _propTypes2.default.string
};

SourceCode.defaultProps = {
    extraClasses: 'source_visible'
};

exports.default = SourceCode;