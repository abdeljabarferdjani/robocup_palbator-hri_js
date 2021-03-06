import AskName from "../view/Global/AskName";
import AskSpeciality from "../view/Scenario/PresentSchool/AskSpeciality";
import AskAge from "../view/Scenario/Receptionist/AskAge";
import AskDrink from "../view/Global/AskDrink";
import AskSomething from "../view/Global/AskSomething";
//import {PresentPerson} from "../view/Scenario/Receptionist/PresentPeople";
import PresentPerson from "../view/Scenario/Receptionist/PresentPeople";
import Confirm from "../view/Global/Confirm";
import DetailDrinks from "../view/Scenario/ServingDrinks/DetailDrinks";
import GoTo from '../view/Global/GoTo/'
import FindAvailableDrinks from "../view/Scenario/ServingDrinks/FindAvailableDrinks";
import FindWhoWantsDrinks from "../view/Scenario/ServingDrinks/FindWhoWantDrinks";
import SeatGuest from "../view/Scenario/Receptionist/SeatGuest";
import PointTo from "../view/Scenario/Receptionist/PointTo";
import Find from "../view/Scenario/Receptionist/Find";
import AskToFollow from "../view/Global/AskToFollow";
import ServeDrinks from "../view/Scenario/ServingDrinks/ServeDrinks";
import MainMenu from '../view/Global/MainMenu/';
import Wait from "../view/Global/Wait";
import AskOpenDoor from "../view/Scenario/Receptionist/AskOpenDoor";
import DisplayInfo from "../view/Scenario/PresentSchool/DisplayInfo";
import CallHuman from '../view/Scenario/TakeOutTheGarbage/CallHuman';
import ShowVideo from '../view/Global/ShowVideo';
import Generic from "../view/Generic";
import AskRoomToClean from "../view/Scenario/CleanUp/AskRoomToClean";
import OpenDoor from "../view/Scenario/CleanUp/OpenDoor";
import FoundObject from "../view/Scenario/CleanUp/FoundObject";
import CatchObject from "../view/Scenario/CleanUp/CatchObject";
import StoreObject from "../view/Scenario/CleanUp/StoreObject";
import ReleaseObject from "../view/Scenario/CleanUp/ReleaseObject";
import ObjectAction from "../view/Scenario/CleanUp/ObjectAction";
import LookForGuest from "../view/Scenario/Receptionist/LookForGuest";
import FoundAnyone from "../view/Scenario/Receptionist/FoundAnyone";
import FoundGuest from "../view/Scenario/Receptionist/FoundGuest";
import LookForKnownGuest from "../view/Scenario/Receptionist/LookForKnownGuest";
import MainMenuPalbator from "../view/Global/MainMenuPalbator";
/**
 * Get the Component class from his name (string)
 *
 * @param view
 * @return {*} Component MainMenu is return as default.
 */
const getClassFromView = (view) => {
	return viewClassMap[view] || MainMenu;
};

/**
 * @description Map that resolve a name of a view (in views.json) to React component
 * If you want to **add new views** you have to modify this object
 */
const viewClassMap = {
	"askName": AskName,
	"askSpeciality": AskSpeciality,
	"askDrink": AskDrink,
	"askAge": AskAge,
	"askSomething": AskSomething,
	"confirm": Confirm,
	"detailDrinks": DetailDrinks,
	"presentPerson": PresentPerson,
	"goTo": GoTo,
	"generic": Generic,
	"findAvailableDrinks": FindAvailableDrinks,
	"findWhoWantsDrinks": FindWhoWantsDrinks,
	"serveDrinks": ServeDrinks,
	"seatGuest": SeatGuest,
	"askToFollow": AskToFollow,
	"mainMenu": MainMenu,
	"wait": Wait,
	"askOpenDoor": AskOpenDoor,
	"displayInfo": DisplayInfo,
	"callHuman": CallHuman,
	"showVideo": ShowVideo,
	"pointTo": PointTo,
	"find": Find,
	'askRoom': AskRoomToClean,
	'openDoor': OpenDoor,
	'findObject': FoundObject,
	'catchObject': CatchObject,
	'storeObject': StoreObject,
	'releaseObject': ReleaseObject,
	'objectAction': ObjectAction,
	'lookForGuest': LookForGuest,
	'foundAnyone': FoundAnyone,
	'foundGuest': FoundGuest,
	'lookForKnownGuest': LookForKnownGuest,
	'mainMenuPalbator': MainMenuPalbator,
};

/**
 * @description Return all possible views of the application.
 * @return {Array<String>}
 */
const getAllViewsKey = () => {
	return Object.keys(viewClassMap);
};


export {
	getClassFromView,
	getAllViewsKey
};