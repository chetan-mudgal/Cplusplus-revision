// promise implementation

class MyPromise {
  state;// state can be pending, fulfilled, rejected
  result;// result can be undefined or some value
  // maintain two arrays to hold the callbacks to be called later when promise is resolved or rejected.
  successCallbacks = [];
  faiureCallbacks = [];

  constructor(executor) {
    // your code here
    this.state = "pending";
    this.result = undefined;
    try{
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch(err){
      this.reject(err);
    }
  
  }
  
  resolve(arg){

    if(this.state !== "pending"){
      return;
    }
    this.result = arg;
    this.state = "fulfilled";
    this.successCallbacks.forEach(cb => cb(arg));
  }

  reject(arg){
    if(this.state !== "pending"){
      return;
    }
    this.result = arg;
    this.state = "rejected";
    this.faiureCallbacks.forEach(cb => cb(arg));
  }

  then(onFulfilled, onRejected) {
    // your code here
    return new MyPromise((resolve, reject) => {
      // when the .then is called, there can be three states of the promise

      function successCaller(arg){
        if(!onFulfilled){
          return resolve(arg);
        }
        try {
          let val = onFulfilled(arg);
          resolve(val);
        }catch(err){
           reject(err);
        }
      }

      function rejectCaller(arg){
        if(!onRejected){
          return reject(arg);
        }
        try {
          let val = onRejected(arg);
           resolve(val);
        }catch(err){
           reject(err);
        }
      }
      switch(this.state){
        case "pending":
          this.successCallbacks.push(successCaller);
          this.faiureCallbacks.push(rejectCaller);
        break;
        case "fulfilled":
          resolve(successCaller(this.result));
        break;
        case "rejected":
          reject(rejectCaller(this.result));
          // defer it to becalled with catch in case onRejected is not available
        break;
      }
    });
  }
  
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  
  static resolve(value) {
    // your code here

    // immediately resolve that
    return new MyPromise((resolve, _) => resolve(value));
  }
  
  static reject(value) {
    // your code here
    return new MyPromise((_, reject) => reject(value));
  }
}

const mp = new MyPromise((resolve, reject) => { reject('bfe')})
mp.then((data) => {
  console.log("should not be called ", data);
}, (error) => {
  console.log("should be called ", error);
}).then((data) => {
  console.log("should be undefined ", data);
}, (error) => {
  console.log("should not be called ", error);
})
