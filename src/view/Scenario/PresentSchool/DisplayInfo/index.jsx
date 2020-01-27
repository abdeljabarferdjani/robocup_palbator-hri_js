import React, {Component} from 'react';
import {comAction} from "../../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import {SpeakableButton} from "../../../Global/reusableComponent/Button/SpeakableButton";
import PropTypes from 'prop-types'
import './DisplayInfo.css'

const mapDispatchToProps = (dispatch) => {
	return {
		handleClick: () => {
			dispatch({
				type: comAction.dataJs.type,
				data: {}
			})
		}
	}
};

const mapStateToProps = () => {
	return {}
};

class DisplayInfo extends Component {
	
	static propTypes = {
		textToShow: PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	};
	
	render() {
		return (
			<div className={"DisplayInfo"}>
				<ComponentTitle>{this.props.textToShow.title}</ComponentTitle>
				<div>
					
					<ul className="description">
						{this.props.textToShow.description.map(str =>
							<li>{str}</li>
						)}
					</ul>
					<div>
						<SpeakableButton
							onClick={this.props.handleClick}>Next</SpeakableButton>
					</div>
				</div>
			
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayInfo);