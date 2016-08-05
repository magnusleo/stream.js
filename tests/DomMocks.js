module.exports = function EventedDomMock() {
    var eventList = {};
    return {
        addEventListener: function(eventType, callback) {
            eventList[eventType] = callback;
        },
        dispatchEvent: function(evt) {
            if (typeof eventList[evt.type] === 'function') {
                eventList[evt.type](evt);
            }
        },
    };
};
