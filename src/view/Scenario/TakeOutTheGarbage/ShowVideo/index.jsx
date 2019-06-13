import React, {Component} from 'react';
import ConfigWrapper from "../../../../controller/ConfigWrapper";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";
import PropTypes from 'prop-types'
import './ShowVideo.css'
const {videos} = ConfigWrapper.get();

class ShowVideo extends Component {
	
	static propTypes = {
		textToShow: PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.arrayOf(PropTypes.string).isRequired
		}),
		video: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired
	};
	
	render() {
		const textToShow = this.props.textToShow || {title: "Please reproduce the videos", description: ["A", "B", "C", "D"]};
		return (
			<div className={"ShowVideo"}>
				<ComponentTitle>{textToShow.title}</ComponentTitle>
				<div>
					<video autoPlay loop muted src={videos[this.props.video]}/>
					<ol className={"description"} id="steps">{textToShow.description.map(str => <li>{str}</li>)}</ol>
				</div>
			</div>
		);
	}
}

export default ShowVideo;