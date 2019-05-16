import React, {Component} from 'react';
import {connect} from 'react-redux'
import Logger from "../../../dev/Logger";
import logConfig from '../../../config/log'
import Icon from "../reusableComponent/Icon";

import './Toolbar.css'

import internetError from './icons/internetError.svg'
import muteMicro from './icons/muteMicro.svg'
import pcProblem from './icons/pcProblem.svg'
import {toolbarAction} from "../../../redux/actions/ToolbarAction";

const mapStateToProps = (state) => {
	return {
		toolbar: state.toolbar
	}
};


class Toolbar extends Component {
	
	
	static logger = new Logger(logConfig.Toolbar, "Toolbar");
	
	constructor(props) {
		super(props);
		this.state = {
			infos: props.toolbar
		}
	}
	
	
	static getDerivedStateFromProps(nextProps, prevState) {
		
		if (nextProps.toolbar !== prevState.infos) {
			
			
			return {
				...prevState,
				infos: nextProps.toolbar,
			}
		}
		
		return null;
	}
	
	render() {
		
		Toolbar.logger.log("Render", this.props);
		let className = "Toolbar";
		className += (this.props.className) ? this.props.className : "";
		
		
		const icons = [];
		
		if (this.state.infos.internet === toolbarAction.changeToolbar.state.error) {
			icons.push(<Icon image={internetError}
			                 description={"An error occured with the internet connection"}
			                 animation={false}
			                 copyright={"Icons made by surang from https://www.flaticon.com/"}
			                 key={0}/>)
		}
		
		if (this.state.infos.micro === toolbarAction.changeToolbar.state.error) {
			icons.push(<Icon image={muteMicro}
			                 description={"Pepper can't hear you"}
			                 animation={true}
			                 copyright={"Icons made by Smashicons from https://www.flaticon.com/"}
			                 key={1}/>)
		}
		
		
		if (this.state.infos.pcConnection === toolbarAction.changeToolbar.state.error) {
			icons.push(<Icon image={pcProblem}
			                 description={"Pepper can't connect to the laptop"}
			                 animation={false}
			                 copyright={"Icons made by monkik from https://www.flaticon.com/"}
			                 key={2}/>)
			
		}
		
		
		return (
			<div className={className}>
				<div id={"icons"}>{icons}</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Toolbar);