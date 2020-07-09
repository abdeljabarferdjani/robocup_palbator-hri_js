import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ObjectToFind from "../../../Global/reusableComponent/ObjectToFind/ObjectToFind";
import './FindObject.css';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import { viewAction } from '../../../../redux/actions/ViewAction';
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import Location from "../../../Global/reusableComponent/Location";

function mapStateToProps(state) {
	return {};
}

class FindObject extends Component {
	
	static propTypes = {
		location: PropTypes.object.isRequired,
		textToShow: PropTypes.string.isRequired,
	};

	
	componentDidMount() {
		this.props.viewOk();
		//this.viewOk();
	}
	
	render() {
		
		return (
			<div className={"FindObject"}>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
				<Location obj={this.props.location}/>
			</div>
		);
	}
/*
	viewOk() {
		this.props.store.dispatch({
			type: viewAction.getIndexCurrentAction.type
		});
		this.props.store.dispatch({
			type: comAction.dataJs.type,
			data: {status: 200}
		})
	}
*/

}

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

export default connect(mapStateToProps, mapDispatchToProps)(FindObject);
