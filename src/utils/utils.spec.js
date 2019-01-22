"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var defaults_1 = require("../defaults");
var index_1 = require("./index");
var log_1 = require("../log");
var base = 8;
describe('combineSpacing', function () {
    ;
    [1, '1'].forEach(function (marginTop) {
        return it("should combine valid spacing props (" + typeof marginTop + ")", function () {
            return expect(index_1.combineSpacing({
                spacingProps: {
                    marginTop: marginTop,
                    marginBottom: 2
                },
                base: base
            })).toEqual({
                borderBottomWidth: base * 2,
                borderTopWidth: base
            });
        });
    });
    it('should log an error if too many arguments for spacing are provided', function () {
        spyOn(log_1["default"], 'error');
        index_1.combineSpacing({
            spacingProps: {
                margin: [1, 2, 3, 4, 5]
            },
            base: 1
        });
        expect(log_1["default"].error).toHaveBeenCalled();
    });
    it('should invalidate spacing properties if conflicting values are passed', function () {
        spyOn(log_1["default"], 'error');
        var out = index_1.combineSpacing({
            spacingProps: {
                margin: [1, 2, 3, 4],
                marginTop: 0
            },
            base: 1
        });
        expect(log_1["default"].error).toHaveBeenCalled();
        expect(out).toEqual({});
    });
    [
        '1 0.5 2 0',
        '1,0.5,2,0',
        '1   0.5  2 0',
        '1, 0.5, 2, 0',
        '1 , 0.5  , 2 ,  0',
        'S , S/2 M 0',
    ].forEach(function (margin) {
        return it("should convert space separated strings to valid spacing props for \"" + margin + "\"", function () {
            return expect(index_1.combineSpacing({
                spacingProps: {
                    margin: margin
                },
                base: base
            })).toEqual({
                borderTopWidth: base,
                borderRightWidth: base / 2,
                borderBottomWidth: base * 2,
                borderLeftWidth: 0
            });
        });
    });
    it('should fail with multiple consecutive empty commas', function () {
        expect(index_1.combineSpacing({
            spacingProps: {
                margin: '1,,2'
            },
            base: base
        })).toEqual({
            borderTopWidth: base,
            borderRightWidth: NaN,
            borderBottomWidth: base * 2,
            borderLeftWidth: NaN
        });
    });
    it('should convert numbers to valid spacing props', function () {
        expect(index_1.combineSpacing({
            spacingProps: {
                margin: 1
            },
            base: base
        })).toEqual({
            borderTopWidth: base,
            borderRightWidth: base,
            borderBottomWidth: base,
            borderLeftWidth: base
        });
    });
    it('should convert mixed arrays to valid spacing props', function () {
        expect(index_1.combineSpacing({
            spacingProps: {
                margin: [1, '0', '2']
            },
            base: base
        })).toEqual({
            borderTopWidth: base,
            borderRightWidth: 0,
            borderBottomWidth: base * 2,
            borderLeftWidth: 0
        });
    });
    it('should use gutter for spacing props', function () {
        expect(index_1.combineSpacing({
            spacingProps: {
                margin: ['verticalGutter/2', 'gutter', 'verticalGutter', 'gutter/2']
            },
            gutter: 3,
            verticalGutter: 4,
            base: base
        })).toEqual({
            borderTopWidth: (base * 4) / 2,
            borderRightWidth: base * 3,
            borderBottomWidth: base * 4,
            borderLeftWidth: (base * 3) / 2
        });
    });
});
describe('validateSpacingProps', function () {
    it('should not throw for valid props', function () {
        expect(function () { return index_1.validateSpacingProps({}); }).not.toThrowError();
        expect(function () { return index_1.validateSpacingProps({ marginArray: [] }); }).not.toThrowError();
        expect(function () { return index_1.validateSpacingProps({ paddingArray: [] }); }).not.toThrowError();
    });
    it('should log an error for invalid props', function () {
        spyOn(log_1["default"], 'error');
        index_1.validateSpacingProps({ marginTop: 1, marginArray: [1] });
        expect(log_1["default"].error).toHaveBeenCalled();
    });
    it('should log an error for invalid props', function () {
        spyOn(log_1["default"], 'error');
        index_1.validateSpacingProps({
            marginTop: 1,
            marginRight: 2,
            marginBottom: 0.5,
            marginLeft: 0,
            marginArray: [1, 2, 0.5, 0]
        });
        expect(log_1["default"].error).toHaveBeenCalled();
    });
});
describe('getCSS', function () {
    it('should return "{}" if value is not set', function () {
        var css = index_1.getCSS('marginTop');
        expect(css).toEqual({});
    });
    it('should set padding as is', function () {
        var css = index_1.getCSS('paddingLeft', 3, 5);
        expect(css).toEqual({
            paddingLeft: 3 * 5
        });
    });
    it('should set margin as border width', function () {
        var css = index_1.getCSS('marginBottom', 2, 4);
        expect(css).toEqual({
            borderBottomWidth: 2 * 4
        });
    });
});
describe('parseSpacing', function () {
    it('should return undefined if spacing is undefined', function () {
        expect(index_1.parseSpacing(undefined)).not.toBeDefined();
    });
    it('should return a number array as is', function () {
        expect(index_1.parseSpacing([1, 0.5])).toEqual([1, 0.5]);
    });
    it('should cast a mixed or string array to floats', function () {
        expect(index_1.parseSpacing(['2.5'])).toEqual([2.5]);
    });
    it('should convert a string to array', function () {
        expect(index_1.parseSpacing('1')).toEqual([1]);
    });
    it('should convert a number to array', function () {
        expect(index_1.parseSpacing(2)).toEqual([2]);
    });
    it('should log an error if using another format', function () {
        spyOn(log_1["default"], 'error');
        index_1.parseSpacing({});
        expect(log_1["default"].error).toHaveBeenCalled();
    });
    it('should accept strings and numbers in an array, space separated strings, and comma separated strings', function () {
        var strAndNums = ['1', 0, '0.5'];
        var spaceSeparated = '1 0 0.5';
        var commaSeparated = '1,0, 0.5';
        var expected = [1, 0, 0.5];
        expect(index_1.parseSpacing(spaceSeparated)).toEqual(expected);
        expect(index_1.parseSpacing(commaSeparated)).toEqual(expected);
        expect(index_1.parseSpacing(strAndNums)).toEqual(expected);
    });
    it('should accept a single number or a string that is castable to a float', function () {
        expect(index_1.parseSpacing(1)).toEqual([1]);
        expect(index_1.parseSpacing('1')).toEqual([1]);
    });
    it('should replace spacing aliases with their aliases values', function () {
        var spacingAliases = { XS: 0.5, S: 1 };
        var spaing = [2, 'XS', 'S', 2];
        var expected = [2, 0.5, 1, 2];
        expect(index_1.parseSpacing(spaing, spacingAliases)).toEqual(expected);
    });
});
describe('replaceSpacingAliases', function () {
    it('should replace all spacing aliases with their aliased values', function () {
        var spacingAliases = {
            XS: 0.5,
            S: 1
        };
        expect(index_1.replaceSpacingAliases([2, 'XS', 'S', 2], spacingAliases)).toEqual([
            2,
            0.5,
            1,
            2,
        ]);
    });
});
describe('toCXS', function () {
    it('should return an object with the same keys', function () {
        var out = index_1.toCXS({
            a: { background: 'red', color: 'blue' },
            b: { fontSize: '3px' }
        });
        expect(out).toEqual(jasmine.objectContaining({
            a: jasmine.any(String),
            b: jasmine.any(String)
        }));
        expect(lodash_1.size(out)).toBe(2);
    });
});
describe('getValue', function () {
    it('should read the value specified by context', function () {
        var out = index_1.getValue({ columns: 14 }, 'columns');
        expect(out).toBe(14);
    });
    it('should prefer the override value when provided', function () {
        var out = index_1.getValue({ columns: 14 }, 'columns', 20);
        expect(out).toBe(20);
    });
    it('should use the default value when context or overrides are not set', function () {
        var out = index_1.getValue({}, 'columns');
        expect(out).toBe(defaults_1["default"].columns);
    });
});
describe('getValues', function () {
    it('should return an object', function () {
        var out = index_1.getValues({ gymnast: {} });
        expect(out).toEqual(jasmine.any(Object));
    });
    it('should merge context, overrides and defaults', function () {
        var out = index_1.getValues({ A: 2 });
        expect(out.A).toBe(2);
        expect(lodash_1.size(out)).toBeGreaterThan(1);
    });
    it('should favor overrides when all are specified', function () {
        var out = index_1.getValues({ gymnast: { columns: 2 } }, { columns: 4 });
        expect(out.columns).toBe(4);
    });
    it('should favor context when only context and defaults are set', function () {
        var out = index_1.getValues({ columns: 2 });
        expect(out.columns).toBe(2);
    });
    it('should fall back to defaults when no properties are set', function () {
        var out = index_1.getValues();
        expect(out).toEqual(defaults_1["default"]);
    });
});
describe('accumulateOver', function () {
    it('should return a function', function () {
        var out = index_1.accumulateOver([]);
        expect(out).toEqual(jasmine.any(Function));
    });
    it('should accumulate values to the first parameter', function () {
        var out = index_1.accumulateOver(['test', 'foo']);
        var acc = { test: {}, foo: {} };
        out(acc, { test: { a: 2 }, foo: { b: 3 } });
        out(acc, { test: { c: 2 }, foo: { d: 3 } });
        expect(acc).toEqual({
            test: {
                a: 2,
                c: 2
            },
            foo: {
                b: 3,
                d: 3
            }
        });
    });
});
describe('kebabCase', function () {
    it('should work with empty strings', function () {
        expect(index_1.kebabCase('')).toEqual('');
    });
    it('should not modify strings without upper case characters', function () {
        var sample = 'this-is-a-test1#';
        expect(index_1.kebabCase(sample)).toEqual(sample);
    });
    it('should lower case upper case letters and add a preceding dash', function () {
        var sample = 'thisWillHaveDashes';
        expect(index_1.kebabCase(sample)).toEqual('this-will-have-dashes');
    });
    it('should not add an additional dash if the first letter is capitalize', function () {
        var sample = 'Lowercase';
        expect(index_1.kebabCase(sample)).toEqual('lowercase');
    });
});
