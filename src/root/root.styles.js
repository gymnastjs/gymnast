"use strict";
exports.__esModule = true;
var utils_1 = require("../utils");
var withResolution_logic_1 = require("../withResolution/withResolution.logic");
var accumulateStyles = utils_1.accumulateOver(['root', 'child']);
var smallRoot = {
    overflow: 'hidden',
    paddingLeft: 0,
    paddingRight: 0
};
function addRootPadding(query, padding) {
    var _a;
    return {
        root: (_a = {},
            _a[query] = {
                paddingLeft: padding,
                paddingRight: padding
            },
            _a),
        child: {}
    };
}
function addChildPadding(query, padding) {
    var _a, _b;
    return {
        root: (_a = {},
            _a[query] = smallRoot,
            _a),
        child: (_b = {},
            _b[query] = {
                flexShrink: 0,
                width: "calc(100% + " + padding + "px)"
            },
            _b)
    };
}
function getStyles(_a) {
    var gutter = _a.gutter, pageMargin = _a.pageMargin, base = _a.base, displayAliases = _a.displayAliases;
    var css = Object.keys(displayAliases)
        .map(function (alias) {
        var query = withResolution_logic_1.getMediaQuery(alias, displayAliases);
        var paddingBase = pageMargin[alias] - gutter / 2;
        if (paddingBase > 0) {
            var paddingPx = paddingBase * base + "px";
            return addRootPadding(query, paddingPx);
        }
        var width = (gutter / 2 - pageMargin[alias]) * base * 2;
        return addChildPadding(query, width);
    })
        .reduce(accumulateStyles, { root: {}, child: {} });
    return utils_1.toCXS(css);
}
exports["default"] = getStyles;
