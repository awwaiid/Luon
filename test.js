/* eslint-disable quotes */
"use strict";
const litest = require("litests");
const luon = require("./index.js");

new litest.BulkTester(luon).testEqualsAll([
    "read",
    {
        "true": true,
        "false": false,
        "nil": undefined,
        "12345": 12345,
        "1": 1,
        "-1": -1,
        "0xFF": 255,
        "0xFFP1": 255 * 2,
        "1e10": 1e10,
        "0.1": 0.1,
        "'string'": "string",
        '"string"': "string",
        "[[string]]": "string",
        "[=[string]=]": "string",
        "'\\226\\130\\172'": "€",
        "'\\xF0\\x90\\x8D\\x88'": "𐍈", // two character utf 16
        "{a=1, b=2}": {
            a: 1,
            b: 2
        },
        "{a=1}": {
            a: 1
        },
        "{[ [[yay]]]=true}": {
            yay: true
        },
        "{   much    =   'spacing'   }": {
            much: "spacing"
        },
        "{ 1 , 2 }": [1,2]
    },
    "readRemoveComments", {
        "10--comment": 10,
        "10--[[comment]]0": 100,
    },
    "removeCommentsText",
    {
        "some--comment": "some",
        "some--[[multi-line comment]]": "some",
        "some--[===[multi-line comment]===]": "some",
        "some--comment\nnext line": "some\nnext line",
        "some--[=[comment\n]=]next line": "some\nnext line"
    },
    "removeSpacingText",
    {
        "some tests": "sometests",
        "'some tests'": "'some tests'",
        "[===[some tests]===]": "[===[some tests]===]"
    },
    "writeText",
    [
        NaN, "nil",
        +Infinity, "nil",
        -Infinity, "nil",
        [true, false, true, undefined], "{true,false,true,nil}",
        "test", '"test"',
        "test\nheh", '"test\\nheh"',
        "\x20", '"\x20"',
        "a", '"a"',
        "\u0007", '"\\a"',
        "€", '"€"',
        123456, "1.23456e5",
        101, "1.01e2",
        10, "1e1"
    ],
    "writeCompressedText",
    [
        "test'test", '"test\'test"',
        1000000, "1e6"
    ],
    "writeBeautifiedText",
    [
        [true, false, true, undefined], "{\n  true,\n  false,\n  true,\n  nil\n}",
        [
            [1, 2],
            [3, 4]
        ], "{\n  {\n    1,\n    2\n  },\n  {\n    3,\n    4\n  }\n}"
    ]
]);