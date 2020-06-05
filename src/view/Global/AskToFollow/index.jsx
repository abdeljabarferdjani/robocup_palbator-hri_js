import React, {Component} from 'react';
import ComponentTitle from "../reusableComponent/ComponentTitle";
import Location from "../reusableComponent/Location";
import PropTypes from "prop-types";
import Guest from "../../Scenario/Receptionist/PresentPeople/Guest";
import './AskToFollow.css';
import {comAction} from "../../../redux/actions/CommunicationAction";

import {connect} from "react-redux";
import { viewAction } from '../../../redux/actions/ViewAction';

const peopleProps = PropTypes.shape({
	name: PropTypes.string.isRequired,
	drink: PropTypes.object.isRequired,
	guestPhotoPath: PropTypes.string,
	age: PropTypes.string
});

class AskToFollow extends Component {
	
	static propTypes = {
		textToShow: PropTypes.string,
		location: PropTypes.object.isRequired,
		who: peopleProps.isRequired
	};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		const textToShow = this.props.textToShow || "Please follow me";
		console.log("AskToFollow props", this.props);
		return (
			<div className={"AskToFollow"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div>
					<Guest drinkObj={this.props.who.drinkObj}
						name={this.props.who.name}
						guestPhotoPath={this.props.who.guestPhotoPath}
						age={this.props.who.age}/>
					<Location obj={this.props.location}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {
		viewOk: () => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				data: {status: 200}
			});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(AskToFollow);