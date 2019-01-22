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
var cxs_1 = require("../cxs");
var defaults_1 = require("../defaults");
var log_1 = require("../log");
var errors_1 = require("../errors");
var hasDefinedValues = function (keys) { return function (key) { return typeof keys[key] !== 'undefined'; }; };
var isDefined = function (val) { return typeof val !== 'undefined'; };
// regex case examples: https://regex101.com/r/bs73rZ/1
exports.splitPattern = /(?:(?:\s+)?,(?:\s+)?|\s+)/;
exports.noop = function () { return null; };
exports.times = function (n) {
    return new Array(n).fill(undefined).map(function (val, index) { return index; });
};
exports.kebabCase = function (str) {
    return str
        .replace(/^[A-Z]/, function (match) { return match.toLowerCase(); })
        .replace(/[A-Z]/g, function (match) { return "-" + match.toLowerCase(); });
};
function validateSpacingProps(props) {
    if (process.env.NODE_ENV === 'production') {
        return true;
    }
    var margins = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'];
    var paddings = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
    if ((typeof props.marginArray !== 'undefined' && margins.some(hasDefinedValues(props))) ||
        (typeof props.paddingArray !== 'undefined' && paddings.some(hasDefinedValues(props)))) {
        log_1["default"].error(errors_1["default"].MIXEDSPACING, "\"" + JSON.stringify(props) + "\" used");
        return false;
    }
    return true;
}
exports.validateSpacingProps = validateSpacingProps;
function getSpacing(values, type) {
    if (values === void 0) { values = []; }
    var _a;
    if (!values || !values.length) {
        return {};
    }
    var allValues = [];
    switch (values.length) {
        case 1:
            allValues = [values[0], values[0], values[0], values[0]];
            break;
        case 2:
            allValues = [values[0], values[1], values[0], values[1]];
            break;
        case 3:
            allValues = [values[0], values[1], values[2], values[1]];
            break;
        case 4:
            allValues = values;
            break;
        default:
            log_1["default"].error(errors_1["default"].TOOMANYSPACEVAL, "\"" + JSON.stringify(values) + "\" used");
            allValues = values;
    }
    return _a = {},
        _a[type + "Top"] = allValues[0],
        _a[type + "Right"] = allValues[1],
        _a[type + "Bottom"] = allValues[2],
        _a[type + "Left"] = allValues[3],
        _a;
}
function getCSS(prop, value, base) {
    var _a, _b;
    var num = typeof value === 'number' ? value : parseFloat(value || 0);
    if (typeof value === 'undefined') {
        return {};
    }
    if (prop.includes('padding')) {
        return _a = {}, _a[prop] = num * base, _a;
    }
    return _b = {},
        _b[prop.replace('margin', 'border') + "Width"] = num * base,
        _b;
}
exports.getCSS = getCSS;
/**
 * parseSpacing allows using different kinds of input for spacing parameters. Instead of allowing
 * only number arrays, the following are also valid:
 *
 * - arrays of strings or numbers (converted to float):
 *   - `margin={["1", 0, "0.5"]}` becomes `[1, 0, 0.5]`
 * - space-separated or comma-separated strings
 *   - `margin="0"` becomes `[0]`
 *   - `margin="1 0"` becomes `[1, 0]`
 *   - `margin="1,0"` becomes `[2, 0]`
 * - numbers
 *   - `margin={1}` becomes `[1]`
 */
function parseSpacing(spacing, spacingAliases) {
    if (typeof spacing === 'undefined') {
        return undefined;
    }
    if (typeof spacing === 'number') {
        return [spacing];
    }
    var spacingArray;
    if (spacing instanceof Array) {
        spacingArray = spacing;
    }
    else if (typeof spacing === 'string') {
        spacingArray = spacing.split(exports.splitPattern);
    }
    if (spacingArray) {
        return replaceSpacingAliases(spacingArray, spacingAliases).map(parseFloat);
    }
    log_1["default"].error(errors_1["default"].INVALIDSPACING, "\"" + typeof spacing + "\" used");
    return undefined;
}
exports.parseSpacing = parseSpacing;
function replaceSpacingAlias(value, spacingAliases) {
    if (spacingAliases && typeof value === 'string' && value in spacingAliases) {
        return spacingAliases[value];
    }
    return value;
}
function replaceSpacingAliases(spacingArray, spacingAliases) {
    return spacingArray.map(function (value) { return replaceSpacingAlias(value, spacingAliases); });
}
exports.replaceSpacingAliases = replaceSpacingAliases;
function replaceSpacingAliasValues(_a) {
    var props = _a.props, spacingAliases = _a.spacingAliases;
    return Object.keys(props).reduce(function (acc, key) {
        var _a;
        return (__assign({}, acc, (_a = {}, _a[key] = replaceSpacingAlias(props[key], spacingAliases), _a)));
    }, {});
}
function combineSpacing(_a) {
    var spacingProps = _a.spacingProps, base = _a.base, spacingAliases = _a.spacingAliases, _b = _a.gutter, gutter = _b === void 0 ? defaults_1["default"].gutter : _b, _c = _a.verticalGutter, verticalGutter = _c === void 0 ? defaults_1["default"].verticalGutter : _c;
    var combinedSpacingAliases = __assign({}, defaults_1["default"].spacingAliases, spacingAliases, { gutter: gutter, 'gutter/2': gutter / 2, verticalGutter: verticalGutter, 'verticalGutter/2': verticalGutter / 2 });
    var margin = spacingProps.margin, padding = spacingProps.padding, props = __rest(spacingProps, ["margin", "padding"]);
    var marginArray = parseSpacing(margin, combinedSpacingAliases);
    var paddingArray = parseSpacing(padding, combinedSpacingAliases);
    if (!validateSpacingProps(__assign({ marginArray: marginArray,
        paddingArray: paddingArray }, props))) {
        return {};
    }
    var flatProps = __assign({}, replaceSpacingAliasValues({
        props: props,
        spacingAliases: combinedSpacingAliases
    }), getSpacing(marginArray, 'margin'), getSpacing(paddingArray, 'padding'));
    return Object.keys(flatProps).reduce(function (acc, prop) { return (__assign({}, acc, getCSS(prop, flatProps[prop], base))); }, {});
}
exports.combineSpacing = combineSpacing;
function toCXS(raw) {
    var styles = {};
    Object.keys(raw).forEach(function (style) {
        styles[style] = cxs_1["default"](raw[style]);
    });
    return styles;
}
exports.toCXS = toCXS;
function getValue(context, property, override) {
    return [override, context[property], defaults_1["default"][property]].find(isDefined);
}
exports.getValue = getValue;
function getValues(context, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __assign({}, defaults_1["default"], context, overrides);
}
exports.getValues = getValues;
function accumulateOver(props) {
    return function (acc, current) {
        props.forEach(function (prop) {
            acc[prop] = Object.assign(acc[prop], current[prop]);
        });
        return acc;
    };
}
exports.accumulateOver = accumulateOver;
exports["default"] = {
    accumulateOver: accumulateOver,
    combineSpacing: combineSpacing,
    getCSS: getCSS,
    getValue: getValue,
    getValues: getValues,
    noop: exports.noop,
    parseSpacing: parseSpacing,
    replaceSpacingAliases: replaceSpacingAliases,
    splitPattern: exports.splitPattern,
    times: exports.times,
    toCXS: toCXS,
    validateSpacingProps: validateSpacingProps
};
