"use strict";
exports.__esModule = true;
/* eslint-disable no-console */
var index_1 = require("./index");
describe('log', function () {
    beforeEach(function () {
        index_1["default"].setLevel('info');
        index_1["default"].setLogger(console);
    });
    it('should define "info", "warn" and "error" methods', function () {
        expect(index_1["default"].info).toEqual(jasmine.any(Function));
        expect(index_1["default"].warn).toEqual(jasmine.any(Function));
        expect(index_1["default"].error).toEqual(jasmine.any(Function));
    });
    it('should not log "info" when log level is "warn"', function () {
        index_1["default"].setLevel('warn');
        spyOn(console, 'log');
        index_1["default"].info('I do nothing!');
        expect(console.log).not.toHaveBeenCalled();
    });
    it('should not log "warn" when log level is "error"', function () {
        index_1["default"].setLevel('error');
        spyOn(console, 'warn');
        index_1["default"].warn('I do nothing either!');
        expect(console.warn).not.toHaveBeenCalled();
    });
    it('should allow defining custom loggers', function () {
        var logger = {
            info: jest.fn()
        };
        index_1["default"].setLogger(logger);
        index_1["default"].info('A', 'B', 3);
        expect(logger.info).toHaveBeenCalledWith('A', 'B', 3);
    });
    it('should log an error if the log level is invalid', function () {
        var logger = {
            error: jest.fn()
        };
        index_1["default"].setLogger(logger);
        index_1["default"].setLevel('incorrect value!');
        expect(logger.error).toHaveBeenCalled();
    });
});
