import AskName from "../view/Global/AskName";
import AskAge from "../view/Scenario/Receptionist/AskInformations/AskAge";
import AskDrink from "../view/Global/AskDrink";
import {PresentPeople} from "../view/Scenario/Receptionist/PresentPeople";
import Confirm from "../view/Global/Confirm";
import DetailDrinks from "../view/Scenario/ServingDrinks/DetailDrinks";
import GoTo from '../view/Global/GoTo/'
import FindAvailableDrinks
	from "../view/Scenario/ServingDrinks/FindAvailableDrinks";
import OpenDoor from "../view/Global/OpenDoor";
import FindWhoWantsDrinks
	from "../view/Scenario/ServingDrinks/FindWhoWantDrinks";
import FindGuest from "../view/Scenario/Receptionist/FindGuest";
import SeatGuest from "../view/Scenario/Receptionist/SeatGuest";
import AskToFollow from "../view/Global/AskToFollow";
import ServeDrinks from "../view/Scenario/ServingDrinks/ServeDrinks";
import MainMenu from '../view/Scenario/MainMenu/'
import Wait from "../view/Global/Wait";
import AskOpenDoor from "../view/Scenario/Receptionist/AskOpenDoor";


const getClassFromView = (view) => {
	return viewClassMap[view];
};

/**
 * @description Map that resolve a name of a view (in views.json) to React component
 * If you want to **add new views** you have to modify this object
 */
const viewClassMap = {
	"askName": AskName,
	"askDrink": AskDrink,
	"askAge": AskAge,
	"confirm": Confirm,
	"detailDrinks": DetailDrinks,
	"presentPerson": PresentPeople,
	"goTo": GoTo,
	"findAvailableDrinks": FindAvailableDrinks,
	"openDoor": OpenDoor,
	"findWhoWantsDrinks": FindWhoWantsDrinks,
	"serveDrinks": ServeDrinks,
	"findGuest": FindGuest,
	"seatGuest": SeatGuest,
	"askToFollow": AskToFollow,
	"mainMenu": MainMenu,
	"wait": Wait,
	"askOpenDoor": AskOpenDoor
	
	
};

/**
 * @description Return all possible views of the application.
 * @return {Array}
 */
const getAllViewsKey = () => {
	return Object.keys(viewClassMap);
};


export {
	getClassFromView,
	getAllViewsKey
};