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
exports.__esModule = true;
var cxs_1 = require("../cxs");
var layoutRefClassName = 'xnr_layout';
var fixed = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)'
};
function getStyles(_a) {
    var maxPageWidth = _a.maxPageWidth, minPageWidth = _a.minPageWidth, base = _a.base;
    var raw = {
        layout: {
            alignItems: 'center',
            alignSelf: 'flex-start',
            border: '0 transparent solid',
            boxSizing: 'border-box',
            display: 'flex',
            flexFlow: 'column',
            minWidth: minPageWidth * base + "px",
            padding: 0,
            width: '100%'
        },
        parentHeight: {
            flexGrow: 1,
            height: '100%'
        },
        overflow: {
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        fitHeight: {
            flexGrow: 0,
            flexShrink: 0
        },
        autoHeight: {
            flexShrink: 0,
            flexGrow: 1
        },
        topFixed: __assign({}, fixed, { top: 0 }),
        bottomFixed: __assign({}, fixed, { bottom: 0 })
    };
    var styleObj = __assign({}, raw.layout);
    if (maxPageWidth !== 'none') {
        styleObj[" > :not(." + layoutRefClassName + ")"] = {
            maxWidth: maxPageWidth * base + "px"
        };
    }
    var layoutStyles = cxs_1["default"](styleObj);
    var styles = {};
    Object.keys(raw).forEach(function (style) {
        styles[style] = cxs_1["default"](raw[style]);
    });
    styles.layout = layoutRefClassName + " " + layoutStyles;
    return styles;
}
exports["default"] = getStyles;
