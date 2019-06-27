import React, {Component} from 'react';
import ComponentTitle from "../reusableComponent/ComponentTitle";
import PropTypes from 'prop-types'
import './ShowVideo.css'
import {SpeakableButton} from "../reusableComponent/Button/SpeakableButton";
import {comAction} from "../../../redux/actions/CommunicationAction";
import {connect} from "react-redux";

class ShowVideo extends Component {
	
	static propTypes = {
		textToShow: PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.arrayOf(PropTypes.string).isRequired
		}),
		video: PropTypes.shape({
			format: PropTypes.oneOf("16/9", "4/3").isRequired,
			pathOnTablet: PropTypes.string.isRequired
		}),
	};
	
	
	render() {
		const textToShow = this.props.textToShow || {
			title: "Please reproduce the videos",
			description: ["A", "B", "C", "D"]
		};
		
		let layout;
		let video = <video autoPlay loop muted
		                   src={this.props.video['pathOnTablet']}/>;
		switch (this.props.video["format"]) {
			
			
			case "16/9":
				layout = <div className={"ShowVideo large"}>
					
					<ComponentTitle>{textToShow.title}</ComponentTitle>
					<SpeakableButton onClick={this.props.viewOk}>I'm
						done</SpeakableButton>
					<div>
						<div className={"video large"}>
							{video}
						</div>
						
						<ol className={"description"}
						    id="steps">{textToShow.description.map(str =>
							<li>{str}</li>)}
						</ol>
					</div>
				</div>;
				break;
			case "4/3":
				layout = <div className={"ShowVideo tail"}>
					<div className={"video tail"}>
						{video}
					</div>
					<div className="text tall">
						<ComponentTitle>{textToShow.title}</ComponentTitle>
						<SpeakableButton onClick={this.props.viewOk}>I'm
							done</SpeakableButton>
						<ol className={"description"}
						    id="steps">{textToShow.description.map(str =>
							<li>{str}</li>)}</ol>
					</div>
				</div>
				break;
		}
		
		
		return layout
	}
}

const mapStateToProps = (state) => {
	return {}
};
const mapDispatchToProps = (dispatch) => {
	return {
		viewOk: () => {
			dispatch({
				type: comAction.dataJs.type,
				data: {status: 200}
			})
		}
	}
};

export default connect(mapStateToProps,
	mapDispatchToProps)(ShowVideo);
