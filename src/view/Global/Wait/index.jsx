import React, {Component} from 'react';
import PropTypes from "prop-types";
import QiWrapper from "../../../model/QiWrapper";
import ConfigWrapper from "../../../controller/ConfigWrapper";
import {Doughnut} from 'react-chartjs-2'
import './Wait.css'
import ComponentTitle from "../reusableComponent/ComponentTitle";

class Wait extends Component {
	
	static propTypes = {
		time: PropTypes.number.isRequired
	};
	
	constructor(props) {
		super(props);
		this.state = {
			remainingTime: this.props.time,
			elapsedTime: 0
		}
	}
	
	componentDidMount() {
		const self = this;
		const intervalId = setInterval(() => {
			self.setState(prev => {
				return {
					...prev,
					remainingTime: prev.remainingTime - 1,
					elapsedTime: prev.elapsedTime + 1
				}
			}, () => {
				if (self.state.remainingTime === 0) {
					clearInterval(intervalId);
					QiWrapper.raise(ConfigWrapper.get().apis.tabletLM['dataJs']['ALMemory'], JSON.stringify({}))
				}
			})
			
			
		}, 1000);
	}
	
	
	render() {
		
		const title = this.props.textToShow !== "" || "I'm waiting for ";
		const data = {
			labels: [
				"", ""
			],
			datasets: [{
				data: [this.props.time - this.state.elapsedTime, this.state.elapsedTime],
				backgroundColor: [
					'#12c4ff',
					'rgba(54,162,235,0)',
				],
				
			}]
		};
		
		const options = {
			elements: {
				arc: {
					borderWidth: 0
				},
			},
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			responsive: true,
			scales: {xAxes: [{display: false,}], yAxes: [{display: false,}],},
			
			
		}
		const chart = <Doughnut data={data} options={options}/>;
		
		return (
			<div id="Wait">
				<ComponentTitle>{title}</ComponentTitle>
				<div id="chart">
					<span className={"timer"}>{this.state.remainingTime}</span>
					{chart}
				</div>
			</div>
		);
	}
}

export default Wait;