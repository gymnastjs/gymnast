"use strict";
exports.__esModule = true;
/* eslint-disable no-console */
var errors_1 = require("../errors");
var logLevels = ['info', 'warn', 'error'];
var logIndex = 0;
var logger = console;
var log = {};
logLevels.forEach(function (level, index) {
    log[level] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (index >= logIndex) {
            logger[level].apply(logger, args);
        }
    };
});
log.setLevel = function (level) {
    var index = logLevels.indexOf(level);
    if (index >= 0) {
        logIndex = index;
    }
    else {
        ;
        log.error(errors_1["default"].INVALIDLOGLEVEL, level);
    }
};
log.setLogger = function (newLogger) {
    logger = newLogger;
};
exports["default"] = log;
