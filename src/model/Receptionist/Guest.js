class Guest extends Object {
	#name;
	#age;
	#drink;
	#gender;
	#newInParty;
	
	static GENDER = {
		male : "MALE",
		female : "FEMALE"
	};

	
	constructor(name, age, drink, gender) {
		super();
		this.#age = age;
		this.#name = name;
		this.#drink = drink;
		this.#gender = gender;
	}
	
	
	toString() {
		
		
		
		return `This is ${this.#name} which favorite drink is ${this.#drink}`
	}
}


export default Guest;