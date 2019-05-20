import React, {Component} from 'react';
import ChangeViews from "../../Debug/ChangeViews";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import PropTypes from "prop-types";

const {views} = ConfigWrapper.get();

class DebugReceptionist extends Component {
	
	static propTypes = {
		changeView : PropTypes.func.isRequired
	}
	
	render() {
		return (
			<div>
				Debug receptionist
				<ChangeViews
					viewList={[
						views.askName,
						views.askDrink,
						views.askAge,
						views.confirm,
						views.presentPerson,
						views.goTo,
						views.findGuest,
						views.seatGuest,
						views.askToFollow]}
					changeView={this.props.changeView}/>
			</div>
		);
	}
}

export default DebugReceptionist;