import QiWrapper from "../model/QiWrapper";

const [DEBUG, INFO, WARNING, ERROR] = [0, 1, 2, 3];
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
			if (sendToLm)
			{
				QiWrapper.raise(loggerALMemory, {
					message: `${funcName} ${x}`,
					application: `${this.#label}`,
					level: DEBUG
					
				});
			}
		}
	}
	
	log(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.log(`${this.#label}: ${funcName}`, x);
			if (sendToLm)
			{
				QiWrapper.raise(loggerALMemory, {
					message: `${funcName} ${x}`,
					application: `${this.#label}`,
					level: INFO
					
				});
			}
		}
	}
	
	
	warn(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.warn(`${this.#label}: ${funcName}`, x);
			if (sendToLm) {
				QiWrapper.raise(loggerALMemory, {
					message: `${funcName} ${x}`,
					application: `${this.#label}`,
					level: WARNING
					
				});
			}
		}
	}
	
	
	error(funcName, x = "", sendToLm = true) {
		if (this.#state)
		{
			console.error(`${this.#label}: ${funcName}`, x);
			if (sendToLm) {
				QiWrapper.raise(loggerALMemory, {
					message: `${funcName} ${x}`,
					application: `${this.#label}`,
					level: ERROR
					
				});
			}
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