import React, {Component} from 'react';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import {SpeakableButton} from "../../../Global/reusableComponent/Button/SpeakableButton";
import PropTypes from 'prop-types'
import './AskRoomToClean.css'
import { viewAction } from '../../../../redux/actions/ViewAction';
import {UserComponentPropTypes} from "../../../../dev/types";


const mapDispatchToProps = (dispatch) => {
	return {
		sendName: (dispatch, name) => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.name,
				data: name
			});
			
		}
	}
};

class AskRoomToClean extends Component {
	
	static propTypes = {
		...UserComponentPropTypes
	};
	
	
	render() {
		
		const textToShow = this.props.textToShow;
		
		let rooms;
		if (this.props.rooms && this.props.rooms.length > 0) {
			rooms = this.props.rooms
		}
		
		return (
			<div>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div className="rooms">
					{rooms.map(room => <SpeakableButton
						onClick={() => this.props.sendName(this.props.dispatch, room.name)}>{room.name}</SpeakableButton>)}
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(AskRoomToClean);