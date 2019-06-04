import QiWrapper from "../model/QiWrapper";

const [HEARTBEAT, EVENT, DEBUG, INFO, WARNING, ERROR, CRITICAL] = [0, 1, 2, 3, 4, 5, 6];
const loggerALMemory = "R2019/Global/LmLogger";
export default class Logger {
	
	#state;
	#label;
	
	constructor(state, label = "") {
		if (state && label !== "") {
			console.info("Logging on " + label)
		}
		
		this.#state = state;
		this.#label = label
	}
	
	
	debug(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.debug(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, DEBUG)
			
		}
	}
	
	log(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.log(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, INFO);
		}
	}
	
	
	sendToLm(sendToLm, funcName, x, level) {
		if (sendToLm)
		{
			QiWrapper.raise(loggerALMemory, {
				message: `${funcName} ${x}`,
				application: `${this.#label}`,
				level: level
				
			});
		}
	}
	
	warn(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.warn(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, WARNING)
		}
	}
	
	
	error(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.error(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, ERROR)
			
		}
	}
	
	event(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.info(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, EVENT)
			
		}
	}
	
	cricical(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.error(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, CRITICAL)
			
		}
	}
	
	heartbeat(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.info(`${this.#label}: ${funcName}`, x);
			this.sendToLm(sendToLm, funcName, x, HEARTBEAT)
			
		}
	}
	
	time(label) {
		if (this.#state)
			console.time(label);
	}
	
	
	timeEnd(label) {
		if (this.#state)
			console.timeEnd(label);
	}
	
}