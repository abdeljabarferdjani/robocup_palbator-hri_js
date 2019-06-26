import AskName from "../view/Global/AskName";
import AskAge from "../view/Scenario/Receptionist/AskInformations/AskAge";
import AskDrink from "../view/Global/AskDrink";
import {PresentPerson} from "../view/Scenario/Receptionist/PresentPeople";
import Confirm from "../view/Global/Confirm";
import DetailDrinks from "../view/Scenario/ServingDrinks/DetailDrinks";
import GoTo from '../view/Global/GoTo/'
import FindAvailableDrinks
	from "../view/Scenario/ServingDrinks/FindAvailableDrinks";
import OpenDoor from "../view/Global/OpenDoor";
import FindWhoWantsDrinks
	from "../view/Scenario/ServingDrinks/FindWhoWantDrinks";
import SeatGuest from "../view/Scenario/Receptionist/SeatGuest";
import AskToFollow from "../view/Global/AskToFollow";
import ServeDrinks from "../view/Scenario/ServingDrinks/ServeDrinks";
import MainMenu from '../view/Global/MainMenu/'
import Wait from "../view/Global/Wait";
import AskOpenDoor from "../view/Scenario/Receptionist/AskOpenDoor";
import CallHuman from '../view/Scenario/TakeOutTheGarbage/CallHuman'
import ShowVideo from '../view/Scenario/TakeOutTheGarbage/ShowVideo'
import Message from "../view/Global/Message/Index";

const getClassFromView = (view) => {
	return viewClassMap[view] || MainMenu;
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
	"presentPerson": PresentPerson,
	"goTo": GoTo,
	"findAvailableDrinks": FindAvailableDrinks,
	"openDoor": OpenDoor,
	"findWhoWantsDrinks": FindWhoWantsDrinks,
	"serveDrinks": ServeDrinks,
	"seatGuest": SeatGuest,
	"askToFollow": AskToFollow,
	"mainMenu": MainMenu,
	"wait": Wait,
	"message": Message,
	"askOpenDoor": AskOpenDoor,
	"callHuman": CallHuman,
	"showVideo": ShowVideo
	
	
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