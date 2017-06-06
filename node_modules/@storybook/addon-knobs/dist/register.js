'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addons = require('@storybook/addons');

var _addons2 = _interopRequireDefault(_addons);

var _Panel = require('./components/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons2.default.register('storybooks/storybook-addon-knobs', function (api) {
  var channel = _addons2.default.getChannel();

  _addons2.default.addPanel('storybooks/storybook-addon-knobs', {
    title: 'Knobs',
    render: function render() {
      return _react2.default.createElement(_Panel2.default, { channel: channel, api: api, key: 'knobs-panel' });
    }
  });
});