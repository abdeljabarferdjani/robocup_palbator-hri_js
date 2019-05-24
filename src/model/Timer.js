import {dispatch} from '../redux/Store'
import {timeAction} from "../redux/actions/TimeAction";
import Logger from "../dev/Logger";
import logConfig from "../config/log";

export default class Timer {
	
	static #startTime;
	
	static #intervalId;
	
	static #lastTime;
	
	static stopTimer() {
		clearInterval(Timer.#intervalId);
	}
	
	static logger = new Logger(logConfig.Timer, "Timer");
	
	static startTimer() {
		
		Timer.#startTime = Date.now();
		Timer.#lastTime = Date.now();
		
		Timer.#intervalId = setInterval(() => {
			const dateNow = Date.now();
			dispatch({
				type: timeAction.passSecond.type,
				globalElapsedTime: Timer.getElapsedTime(Timer.#startTime, dateNow),
				timeFromLastEvent: Timer.getElapsedTime(Timer.#lastTime, dateNow)
			});
			
			Timer.logger.log(Timer.#lastTime);
			
			Timer.#lastTime = dateNow;
			Timer.logger.log(Timer.#lastTime)
			
		}, 1000);
	}
	
	
	static getElapsedTime(from, to) {
		return (to - from) / 1000;
	}
	
	
}