'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createChannel;

var _channels = require('@storybook/channels');

var _channels2 = _interopRequireDefault(_channels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createChannel() {
  var transport = {
    setHandler: function setHandler() {},
    send: function send() {}
  };

  return new _channels2.default({ transport: transport });
}