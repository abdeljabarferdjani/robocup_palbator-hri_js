// http://amanvirk.me/singleton-classes-in-es6/
import socketIOClient from "socket.io-client";

let instance = null;

class SocketWrapper {
  constructor() {

    
    if (!instance) {
      instance = this;
      this.socket = socketIOClient("http://127.0.0.1:5000")
    }

    
    // this.time = new Date();

    return instance;
  }

  singletonMethod() {
    return 'singletonMethod';
  }

  static staticMethod() {
    return 'staticMethod';
  }

  get socket() {
    return this.socket;
  }

  set socket(value) {
    this._type = value;
  }
}

export default SocketWrapper;

// ...
