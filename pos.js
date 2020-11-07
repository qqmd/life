
var hello = {
    hello: 'world',
    foo: 'bar'
};
var qaz = {
    hello: 'stevie',
    foo: 'baz'
}

var myArray = [];
myArray.push(hello,qaz);

pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');
console.log(pos)


