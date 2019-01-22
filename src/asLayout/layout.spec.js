"use strict";
exports.__esModule = true;
var React = require("react");
var react_testing_library_1 = require("react-testing-library");
var index_1 = require("./index");
var layout_1 = require("../layout");
describe('asLayout', function () {
    it('should allow wrapping any element into a Layout', function () {
        var Span = index_1["default"]('span');
        var container = react_testing_library_1.render(React.createElement(Span, null)).container;
        expect(container.firstChild.tagName).toBe('SPAN');
    });
    it('should match the rendering of a Layout when using a div', function () {
        var Div = index_1["default"]('div');
        var gridContainer = react_testing_library_1.render(React.createElement(layout_1["default"], null)).container;
        var divContainer = react_testing_library_1.render(React.createElement(Div, null)).container;
        expect(gridContainer).toEqual(divContainer);
    });
    it('should pass a ref to innerRef', function () {
        var spy = jest.fn();
        var container = react_testing_library_1.render(React.createElement(layout_1["default"], { innerRef: spy }, "test")).container;
        expect(spy).toHaveBeenCalledWith(container.firstChild);
    });
    it('should allow custom defaults', function () {
        var CustomLayout = index_1["default"]('strong', function () { return ({
            marginTop: 2,
            marginBottom: 1.5
        }); });
        var container = react_testing_library_1.render(React.createElement(CustomLayout, null)).container;
        expect(container.firstChild).toHaveMargins({
            top: 2,
            bottom: 1.5
        });
    });
});
