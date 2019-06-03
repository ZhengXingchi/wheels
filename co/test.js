// var fs = require('fs');
 
// function size(file) {
//   return function(fn){
//     fs.stat(file, function(err, stat){
//       if (err) return fn(err);
//       fn.call(null, stat.size);
//     });
//   }
// }
// var getIndexSize = size("./co.js");

// getIndexSize(function(size){
//     console.log(size);
// })

// function co(fn) {
//   return function(done) {
//     var ctx = this;
//     var gen = fn.call(ctx);
//     var it = null;
//     function _next(err, res) {
//       it = gen.next(res);
//       if (it.done) {
//         done.call(ctx, err, it.value);
//       } else {
//         it.value(_next);
//       }
//     }
//     _next();
//   }
// }

// co(function *(){
//   var a = yield size('.gitignore');
//   var b = yield size('package.json');
//   console.log(a);
//   console.log(b);
//   return [a,b];
// })(function (err,args){
//   console.log("callback===args=======");
//   console.log(args);

// })


function delay(time,fn){
 setTimeout(function(){
     // some code..
    fn()
 },time);
}
function cl(){
  yieldDelay.next();
}

function* YieldDelay(){
  yield delay(3200,cl);
  console.log('3200ms done!');
  yield delay(4400,cl);
  console.log('4400ms done!');
  yield delay(5500,cl);
  console.log('5500ms done!');
}

var yieldDelay = YieldDelay();
yieldDelay.next();

function promiseToThunk(promise){
    return function(done){
        promise.then(function(err,res){
            done(err,res);
        },done)
    }
}