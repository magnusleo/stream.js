// Copyright (c) 2015 Magnus Les. All rights reserved.
'use strict';

var test = require('tape');
var stream = require('../index.js');
var EventedDomMock = require('./DomMocks');

test('instance.forEach()', function (assert) {
    var s = stream.create();
    var counter = 1;
    var s2 = s.forEach(function (item) {
        return counter += item;
    });
    var counter2 = 1;
    s2.forEach(function (item) {
        return counter2 += item;
    });
    s.push(2);

    assert.equal(counter, 3, 'runs every data push');
    assert.equal(typeof s2.forEach, 'function', 'is chainable');
    assert.end();
});

test('instance.filter()', function (assert) {
    var s = stream.create();
    var s2 = s.filter(function (item) {
        return item < 10;
    });
    var counter = 1;
    s2.forEach(function (item) {
        return counter += item;
    });
    s.push(10);
    s.push(2);

    assert.equal(counter, 3, 'filters pushed data');
    assert.equal(typeof s2.filter, 'function', 'is chainable');
    assert.end();
});

test('instance.map()', function (assert) {
    var s = stream.create();
    var result = void 0;
    var s2 = s.map(function (value) {
        return value * value;
    });
    s2.forEach(function (value) {
        return result = value;
    });
    s.push(2);

    assert.equal(result, 4, 'maps pushed data');
    assert.equal(typeof s2.map, 'function', 'is chainable');
    assert.end();
});

test('instance.scan()', function (assert) {
    var s = stream.create();
    var s2 = s.scan(function (sum, value) {
        return sum + value;
    }, 1);
    var result = void 0;
    s2.forEach(function (value) {
        return result = value;
    });
    s.push(2);

    assert.equal(result, 3, 'accumulates pushed data');
    assert.equal(typeof s2.scan, 'function', 'is chainable');
    assert.end();
});

test('stream.fromEvent()', function (assert) {
    var element = EventedDomMock();
    var s = stream.fromEvent(element, 'foo bar');
    var result = [];
    s.forEach(function (evt) {
        return result.push(evt.data);
    });
    element.dispatchEvent({ type: 'foo', data: 'foo' });
    element.dispatchEvent({ type: 'bar', data: 'bar' });
    element.dispatchEvent({ type: 'baz', data: 'baz' });

    assert.ok(result.indexOf('foo') > -1, 'gets data when event fired on element');
    assert.ok(result.indexOf('bar') > -1, 'can bind multiple event types');
    assert.ok(result.indexOf('baz') === -1, 'ignores unbound events');
    assert.end();
});
