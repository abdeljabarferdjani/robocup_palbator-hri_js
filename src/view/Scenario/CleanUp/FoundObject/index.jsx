import React, {Component} from 'react';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
// import {SpeakableButton} from "../../../Global/reusableComponent/Button/SpeakableButton";
import PropTypes from 'prop-types'
import './FoundObject.css'
import { viewAction } from '../../../../redux/actions/ViewAction';

class FoundObject extends Component {
	static propTypes = {};
	
	componentDidMount() {
		this.props.viewOk();
	}
	
	render() {
		return (
			<div className={"FoundObject"}>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
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
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundObject);