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
var lodash_1 = require("lodash");
var layout_styles_1 = require("./layout.styles");
var core_1 = require("../core");
var index_1 = require("../utils/index");
var withResolution_1 = require("../withResolution");
var withContext_1 = require("../withContext");
var resolutionProperties = ['fixed', 'height', 'overflow'];
function asLayout(Component, mapDefaultProps) {
    if (mapDefaultProps === void 0) { mapDefaultProps = function (props) { return props; }; }
    function Layout(_a) {
        var className = _a.className, fixed = _a.fixed, height = _a.height, overflow = _a.overflow, innerRef = _a.innerRef, context = _a.context, restProps = __rest(_a, ["className", "fixed", "height", "overflow", "innerRef", "context"]);
        var props = core_1["default"](mapDefaultProps(restProps), context);
        var styles = layout_styles_1["default"](index_1.getValues(context, restProps));
        var classes = lodash_1.compact([
            className,
            fixed && styles[fixed + "Fixed"],
            height ? styles[height + "Height"] : styles.fitHeight,
            overflow && styles.overflow,
            styles.layout,
        ]);
        return React.createElement(Component, __assign({ ref: innerRef }, props, { className: classes.join(' ') }));
    }
    var Resolution = withResolution_1["default"](Layout, resolutionProperties);
    return withContext_1["default"](Resolution);
}
exports["default"] = asLayout;
