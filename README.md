# stream.js
Simple reactive streams. Implemented in the most simple and naive way possible to learn about streams.

## Usage
Just use `index.js` in a browser or node.

```javascript
var s = stream.create();
var se = stream.fromEvent(document.querySelect('#foo'), 'click');

// Do something for each item in the stream
s.forEach(function(item){ console.log(item) });

// Filter items in the stream
s.filter(function(item){ return item > 0 });

// Transform items in the stream
s.map(function(item){ return item * 2 });

// Accumulate a value in the stream (like Array.prototype.reduce)
s.scan(function (sum, value) {
    return sum + value;
}, 1);

// Insert a value into the stream
s.push(1);
```

Take a look at the source files. You are here to learn, right?

## Missing functionality
There are no ways to combine streams.

## Development
```javascript
npm install
npm test
```

## Possible improvements
The current implementation using arrays could be replaced with closures for a more elegant and flexible solution.

## Licence
MIT
