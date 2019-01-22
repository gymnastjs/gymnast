"use strict";
exports.__esModule = true;
var React = require("react");
var react_testing_library_1 = require("react-testing-library");
var index_1 = require("./index");
var grid_1 = require("../grid");
describe('Offset', function () {
    it('should ignore children', function () {
        var container = react_testing_library_1.render(React.createElement(index_1["default"], { size: 1 },
            React.createElement("h1", null, "Nope"))).container;
        expect(container.querySelector('h1')).toBeNull();
    });
    it('should render like an empty grid', function () {
        var container = react_testing_library_1.render(React.createElement(index_1["default"], { size: 2 })).container;
        var gridContainer = react_testing_library_1.render(React.createElement(grid_1["default"], { size: 2 })).container;
        expect(container).toEqual(gridContainer);
    });
});
