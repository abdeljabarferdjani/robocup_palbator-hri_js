import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import ObjectToFind from "../../../Global/reusableComponent/ObjectToFind/ObjectToFind";
import './ObjectAction.css';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import { viewAction } from '../../../../redux/actions/ViewAction';
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";

function mapStateToProps(state) {
	return {};
}

class ObjectAction extends Component {
	
	static propTypes = {
		objectToFind: PropTypes.object.isRequired,
		textToShow: PropTypes.string.isRequired,
	};

	
	componentDidMount() {
		this.props.viewOk();
		//this.viewOk();
	}
	
	render() {
		
		return (
			<div className={"ObjectAction"}>
				<ComponentTitle>{this.props.textToShow}</ComponentTitle>
				<div>
					<ObjectToFind name={this.props.objectToFind.name}
						pathOnTablet={this.props.objectToFind.pathOnTablet}/>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ObjectAction);
