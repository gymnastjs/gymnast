"use strict";
exports.__esModule = true;
var React = require("react");
var react_testing_library_1 = require("react-testing-library");
var index_1 = require("./index");
var grid_styles_1 = require("../asGrid/grid.styles");
describe('Root', function () {
    it('should not crash when empty', function () {
        expect(function () { return react_testing_library_1.render(React.createElement(index_1["default"], null)); }).not.toThrow();
    });
    it('should be centered', function () {
        var container = react_testing_library_1.render(React.createElement(index_1["default"], null)).container;
        expect(container.querySelector("." + grid_styles_1.styles.grid)).toJustify('center');
    });
    it('should include any child elements', function () {
        var container = react_testing_library_1.render(React.createElement(index_1["default"], null,
            React.createElement("h1", null, "Test!"))).container;
        expect(container.querySelector('h1')).not.toBeNull();
    });
});
