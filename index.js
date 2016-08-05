'use strict';

var stream = {};

stream.create = function () {
    var toPush = {
        forEach: [],
        filter: [],
        map: [],
        scan: []
    };

    function subscribe(type, fn) {
        var s = stream.create();
        toPush[type].push({
            callback: fn,
            stream: s
        });
        return s;
    }

    function forEach(fn) {
        return subscribe('forEach', fn);
    }

    function filter(fn) {
        return subscribe('filter', fn);
    }

    function map(fn) {
        return subscribe('map', fn);
    }

    function scan(fn, seed) {
        var s = stream.create();
        toPush['scan'].push({
            callback: fn,
            stream: s,
            accumulated: seed
        });
        return s;
    }

    function push(item) {
        toPush['forEach'].forEach(function (pushee) {
            pushee.callback(item);
            pushee.stream.push(item);
        });

        toPush['filter'].forEach(function (pushee) {
            if (pushee.callback(item)) {
                pushee.stream.push(item);
            }
        });

        toPush['map'].forEach(function (pushee) {
            pushee.stream.push(pushee.callback(item));
        });

        toPush['scan'].forEach(function (pushee) {
            pushee.accumulated = pushee.callback(pushee.accumulated, item);
            pushee.stream.push(pushee.accumulated);
        });
    }

    return {
        forEach: forEach,
        filter: filter,
        map: map,
        scan: scan,
        push: push
    };
};

stream.fromEvent = function (element, eventTypes) {
    var s = stream.create();

    eventTypes.split(' ').forEach(function (eventType) {
        element.addEventListener(eventType, function (evt) {
            s.push(evt);
        });
    });

    return s;
};

if (typeof module !== 'undefined') {
    module.exports = stream;
}
