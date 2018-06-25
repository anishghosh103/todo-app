const events = require('events');
const eventEmitter = new events.EventEmitter();

const eventObj = {};

eventObj.emit = (event, data) => {
  eventEmitter.emit(event, data);
};

eventObj.on = (event, callback) => {
  eventEmitter.on(event, callback);
};

 module.exports = eventObj;