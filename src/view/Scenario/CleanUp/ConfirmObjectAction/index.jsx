import React, {Component} from 'react';
import './ConfirmObjectAction.css';
import {SpeakableButton} from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import {UserComponentPropTypes} from "../../../dev/types";
import ComponentTitle from "../reusableComponent/ComponentTitle";
import { viewAction } from '../../../redux/actions/ViewAction';
import ObjectToFind from "../../../Global/reusableComponent/ObjectToFind/ObjectToFind";


const mapDispatchToProps = (dispatch) => {
	return {
		handleNoClick: (dispatch) => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.confirm,
				data: 'false'
			});
			
			
		},
		handleYesClick: (dispatch) => {
			dispatch({
				type: viewAction.getIndexCurrentAction.type
			});
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.confirm,
				data: 'true'
			});
			
		}
	}
};

class ConfirmObjectAction extends Component {
	
	
	static propTypes = {
		...UserComponentPropTypes,
	};
	
	render() {
		
		
		const textToShow = this.props.textToShow || "Are you sure that you want X?";
		// if (this.props.imagePath !== undefined) { // todo implement it for the next robocup (image of confirmed drink)
		//
		// 	img = <img src={this.props.imagePath}
		// 	           alt=""/>
		// }
		
		
		return (
			<div className={"ConfirmObjectAction"}>
				<ComponentTitle>{textToShow}</ComponentTitle>
				
				<ObjectToFind name={this.props.objectToFind.name}
						pathOnTablet={this.props.objectToFind.pathOnTablet}/>

				<div className={"choices"}>
					<SpeakableButton
						onClick={() => this.props.handleNoClick(this.props.dispatch)}
						color={"no"}>No</SpeakableButton>
					<SpeakableButton
						onClick={() => this.props.handleYesClick(this.props.dispatch)}
						color={"ok"}>Yes</SpeakableButton>
				</div>
			</div>
		);
	}
}

export default connect(mapDispatchToProps)(ConfirmObjectAction);


