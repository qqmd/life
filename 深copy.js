// class StructuredCloner {
//   constructor() {
//     this.pendingClones_ = new Map();
//     this.nextKey_ = 0;

//     const channel = new MessageChannel();
//     this.inPort_ = channel.port1;
//     this.outPort_ = channel.port2;

//     this.outPort_.onmessage = ({data: {key, value}}) => {
//       const resolve = this.pendingClones_.get(key);
//       resolve(value);
//       this.pendingClones_.delete(key);
//     };
//     this.outPort_.start();
//   }

//   cloneAsync(value) {
//     return new Promise(resolve => {
//       const key = this.nextKey_++;
//       this.pendingClones_.set(key, resolve);
//       this.inPort_.postMessage({key, value});
//     });
//   }
// }

// const structuredCloneAsync = window.structuredCloneAsync =
//     StructuredCloner.prototype.cloneAsync.bind(new StructuredCloner);


// const main = async () => {
//   const original = { date: new Date(), number: Math.random() };
//   original.self = original;

//   const clone = await structuredCloneAsync(original);

//   // different objects:
//   console.assert(original !== clone);
//   console.assert(original.date !== clone.date);

//   // cyclical:
//   console.assert(original.self === original);
//   console.assert(clone.self === clone);

//   // equivalent values:
//   console.assert(original.number === clone.number);
//   console.assert(Number(original.date) === Number(clone.date));

//   console.log("Assertions complete.");
// };

// main();
var str = 5
function f() {
console.log(str)
var str = 10
console.log(str)
}
f()