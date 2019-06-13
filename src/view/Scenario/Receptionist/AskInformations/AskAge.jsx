import React, {Component} from 'react';
import {connect} from "react-redux";
import './AskAge.css'
import {comAction} from "../../../../redux/actions/CommunicationAction";
import ComponentTitle from "../../../Global/reusableComponent/ComponentTitle";

const mapDispatchToProps = (dispatch) => {
	return {
		sendName: (dispatch, name) => {
			dispatch({
				type: comAction.dataJs.type,
				dataType: comAction.dataJs.dataType.age,
				data: name
			});
			
		}
	}
};


class AskName extends Component {
	
	
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		}
	}
	
	deleteNumber() {
		this.setState(prev => {
			return {
				...prev,
				value: prev.value.slice(0, -1)
			}
		})
	}
	
	addNumber(number) {
		if (this.state.value.length < 3) {
			this.setState(prev => {
				
				
				let newValue = Number.parseInt(prev.value + number.toString());
				
				return {
					...prev,
					value: newValue.toString()
				}
			})
		}
	}
	
	render() {
		
		const textToShow = this.props.textToShow || "Hello X, how old are you ?";
		
		const digits = [];
		
		for (let i = 1; i < 10; i++) {
			digits.push(<button className={"btn btn-classic"}
			                    onClick={() => this.addNumber(i)}>{i}</button>)
		}
		
		const value = (this.state.value.length > 0) ? this.state.value : "0";
		
		return (
			<div>
				<ComponentTitle>{textToShow}</ComponentTitle>
				<div id="ages">
					<p className="value">{value}</p>
					
					<div id="digits">
						{digits}
						<button className={"btn no"}
						        onClick={() => this.deleteNumber()}>DEL
						</button>
						<button className={"btn btn-classic"}
						        onClick={() => this.addNumber(0)}>0
						</button>
						<button className={"btn ok"}
						        onClick={() => this.props.sendName(this.props.dispatch, Number.parseInt(this.state.value))}>OK
						</button>
					</div>
				
				
				</div>
			</div>
		);
	}
}


export default connect(mapDispatchToProps)(AskName);