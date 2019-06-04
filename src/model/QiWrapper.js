import logConfig from '../config/log'
import globalConfig from '../config/global'
import Logger from "../dev/Logger";


/**
 * @description This class is a wrapper of Naoqi's ALMemory
 * @class QiWrapper
 */
class QiWrapper {
	
	/**
	 * @type {QiWrapper}
	 */
	static #instance; // Singleton instance
	
	/**
	 * @type {Logger}
	 */
	static logger = new Logger(logConfig.QiWrapper, "QiWrapper");
	
	
	/**
	 * @type {QiSession}
	 */
	#session;
	
	#AlMemory; // QI Almemory Proxy
	
	/**
	 * Do NOT call it directly, see @getInstanceSync
	 * @description set proprieties for QiWrapper object.
	 * @param session {QiSession} the session resulted from calling QiMessaging Api.
	 * @param ALMemory the ALMemory's proxy resulted from session.service("AlMemory");
	 */
	constructor(session, ALMemory) {
		
		
		this.#session = session;
		this.#AlMemory = ALMemory;
		QiWrapper.#instance = this;
	}
	
	/**
	 * @param inst {QiWrapper | FalseQiWrapper}
	 */
	static set instance(inst) {
		QiWrapper.#instance = inst;
	}
	
	/**
	 * @returns {QiWrapper}
	 */
	static getInstanceSync() {
		return QiWrapper.#instance
	}
	
	/**
	 * @description return the JSON's version of a value
	 * @param value the value that have to be transform to JSON
	 * @returns {string} the JSON's version of the value
	 */
	static toJson(value) {
		// if (typeof (value) !== "string") {
		// 	value = JSON.stringify(value);
		// }
		return JSON.stringify(value);
	}
	
	/**
	 * @description Create an instance of QiWrapper accessible via promise
	 * @returns {Promise<QiWrapper>}
	 */
	static createInstance() {
		
		
		return new Promise(resolve => {
			
			if (globalConfig.naoqiIsPresent) {
				// eslint-disable-next-line no-undef
				QiSession(async session => {
					
					await session.service("ALMemory").then(async ALMemory => {
						
						const q = new QiWrapper(session, ALMemory);
						QiWrapper.#instance = q;
						QiWrapper.logger.log('QiWrapper : ', q);
						return resolve(q);
					});
				})
			} else {
				return resolve(new FalseQiWrapper());
			}
			
		});
		
		
	}
	
	/**
	 * @example to get the event when pepper catch a touch : QiWrapper.listen("TouchChanged", (data) => {console.log(data)})
	 * @param event {string} the event that will be subscribed
	 * @param cb {function} the callback to do something when event is raised
	 * @return {Promise<null>}
	 */
	static listen(event, cb) {
		return QiWrapper.getInstanceSync().listen(event, cb);
	}
	
	static setALValue(event, value) {
		QiWrapper.getInstanceSync().setALValue(event, value)
		
	}
	
	
	/**
	 * @description get the value stored in a ALMemory
	 * @param event {string} the name of the ALMemory
	 * @returns {Promise<string>} the value in the ALMemory named {event}
	 */
	static getALValue(event) {
		return QiWrapper.getInstanceSync().getAlValue(event)
		
	}
	
	/**
	 * @description raise an ALMemory event
	 * @param event {string} the name of the ALMemory
	 * @param value {Object} the value of the event
	 * @return {Promise} a promise that is resolved when event is raised.
	 */
	static raise(event, value) {
		return QiWrapper.getInstanceSync().raise(event, value)
	}
	
	
	/**
	 *
	 * @exampsle to get the event when pepper catch a touch : inst.listen("TouchChanged", (data) => {console.log(data)})
	 * @param event {string} the event that will be subscribed
	 * @param cb {function} the callback to do something when event is raised
	 * @return {Promise<null>}
	 */
	listen(event, cb) {
		return new Promise(resolve =>
			this.#AlMemory.subscriber(event).then(subscriber => {
				subscriber.signal.connect(state => {
					cb(JSON.parse(state));
				});
				resolve(QiWrapper.logger.event("Listen at", event));
				
			}));
	}
	
	/**
	 * @description Set the value in a ALMemory
	 * @param event {string} the name of the ALMemory
	 * @param value {Object} the value of the event
	 *
	 */
	setALValue(event, value) {
		value = QiWrapper.toJson(value);
		QiWrapper.logger.event("Set ALValue on " + event, value);
		this.#AlMemory.insertData(event, value)
		
	}
	
	/**
	 * @description get the value stored in a ALMemory
	 * @param event {string} the name of the ALMemory
	 * @returns {Promise<string>} the value in the ALMemory named {event}
	 */
	async getAlValue(event) {
		const promisedValue = this.#AlMemory.getData(event);
		
		let value = await promisedValue;
		QiWrapper.logger.event(`getAlValue from ${event}`, value);
		return promisedValue;
		
	}
	
	/**
	 * @description raise an ALMemory event
	 * @param event {string} the name of the ALMemory
	 * @param value {Object} the value of the event
	 * @return {Promise} a promise that is resolved when event is raised.
	 */
	raise(event, value) {
		
		value = QiWrapper.toJson(value);
		
		if (event.includes("R2019/Global/LmLogger"))
			QiWrapper.logger.log(`Send on ${event}`, value, false);
		else {
			if (value.includes("eartbeat"))
			{
				QiWrapper.logger.heartbeat(`Send on ${event}`, value, true);
			} else {
				QiWrapper.logger.event(`Send on ${event}`, value, true)
			}
			
		}
		
		return this.#AlMemory['raiseEvent'](event, value);
	}
}

class FalseQiWrapper {
	
	#client;
	
	constructor(url) {
		
		QiWrapper.instance = this;
		this.#client = new WebSocket(url, "json");
	}
	
	// static warningMessage = () => QiWrapper.logger.warn("FalseRaise", "Naoqi is not present in global.config, check if it's not wanted");
	static warningMessage() {
	}
	
	raise(x, y) {
		FalseQiWrapper.warningMessage()
	};
	
	listen(x, y) {
		FalseQiWrapper.warningMessage()
	};
	
	setALValue(x, y) {
		FalseQiWrapper.warningMessage()
	};
	
	getAlValue(x, y) {
		FalseQiWrapper.warningMessage()
	};
	
}


export default QiWrapper;