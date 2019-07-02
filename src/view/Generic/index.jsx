import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ComponentTitle from "../Global/reusableComponent/ComponentTitle";
import './Generic.css'

class Generic extends Component {
	
	static propTypes = {
		image: PropTypes.shape({
			pathOnTablet: PropTypes.string,
			alternative: PropTypes.string
		}),
		video: PropTypes.shape({
			pathOnTablet: PropTypes.string,
			alternative: PropTypes.string
		}),
		title: PropTypes.string,
		list: PropTypes.arrayOf(PropTypes.string),
		content: PropTypes.string,
		noContainer: PropTypes.bool
	};
	
	render() {
		
		let video = null,
			image = null,
			title = null,
			list = null,
			medias = null,
			content = null;
		
		if (this.props.title) {
			title = <ComponentTitle>{this.props.title}</ComponentTitle>
			
		}
		
		if (this.props.image) {
			image = <img src={this.props.image.pathOnTablet}
			             alt={this.props.image.alternative}/>
		}
		
		if (this.props.video) {
			video = <img src={this.props.video.pathOnTablet}
			             alt={this.props.video.alternative}/>
		}
		
		if (this.props.content) {
			content = this.props.content
		}
		
		if (this.props.video || this.props.image) {
			medias = <div className="media">
				{image}
				{video}
			</div>
		}
		
		if (this.props.list) {
			let arr = [];
			this.props.list.forEach(elem => {
				arr.push(<li>{elem}</li>)
			});
			list = <ol>{arr}</ol>
		}
		
		if (this.props.noContainer) {
			return (
				<>
					{title}
					{medias}
					{content}
					{list}
				</>
			)
			
		} else {
			return (
				<div className={"Generic"}>
					{title}
					{medias}
					{content}
					{list}
				</div>
			);
		}
		
	}
}

export default Generic;