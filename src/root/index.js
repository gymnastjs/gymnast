"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var React = require("react");
var grid_1 = require("../grid");
var root_styles_1 = require("./root.styles");
var utils_1 = require("../utils");
var consumer_1 = require("../configProvider/consumer");
function Root(_a) {
    var children = _a.children, justify = _a.justify, props = __rest(_a, ["children", "justify"]);
    return (React.createElement(consumer_1["default"], null, function (context) {
        var styles = root_styles_1["default"](utils_1.getValues(context, props));
        return (React.createElement(grid_1["default"], __assign({}, props, { className: styles.root, justify: "center" }),
            React.createElement(grid_1["default"], { justify: justify, className: styles.child }, children)));
    }));
}
exports["default"] = Root;
