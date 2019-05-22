import ConfigWrapper from "./ConfigWrapper";
import AskName from "../view/Global/AskName";
import AskAge from "../view/Scenario/Receptionist/AskInformations/AskAge";
import AskDrink from "../view/Global/AskDrink";
import {PresentPeople} from "../view/Scenario/Receptionist/PresentPeople";
import Confirm from "../view/Global/Confirm";
import DetailDrinks from "../view/Scenario/ServingDrinks/DetailDrinks";
import GoTo  from '../view/Global/GoTo/'
import FindAvailableDrinks from "../view/Scenario/ServingDrinks/FindAvailableDrinks";
import OpenDoor from "../view/Global/OpenDoor";
import FindWhoWantsDrinks from "../view/Scenario/ServingDrinks/FindWhoWantDrinks";
import FindGuest from "../view/Scenario/Receptionist/FindGuest";
import SeatGuest from "../view/Scenario/Receptionist/SeatGuest";
import AskToFollow from "../view/Global/AskToFollow";
import ServeDrinks from "../view/Scenario/ServingDrinks/ServeDrinks";
import MainMenu from '../view/Scenario/MainMenu/'
const {views} = ConfigWrapper.get();

const getClassFromView = (view) => {
	return viewClassMap[view] ;
};

/**
 *
 * @description Map that resolve a name of a view (in views.json) to React component
 * If you want to **add new views** you have to modify this object
 */
const viewClassMap = {
	[views.askName]: AskName,
	[views.askDrink]: AskDrink,
	[views.askAge]: AskAge,
	[views.confirm]: Confirm,
	[views.detailDrinks]: DetailDrinks,
	[views.presentPerson]: PresentPeople,
	[views.goTo]: GoTo,
	[views.findAvailableDrinks]: FindAvailableDrinks,
	[views.openDoor]: OpenDoor,
	[views.findWhoWantsDrinks]: FindWhoWantsDrinks,
	[views.serveDrinks] : ServeDrinks,
	[views.findGuest]: FindGuest,
	[views.seatGuest]: SeatGuest,
	[views.askToFollow]: AskToFollow,
	[views.mainMenu]: MainMenu
	
	
};

export {
	getClassFromView
};