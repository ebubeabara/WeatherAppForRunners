// import preact
import { h, render, Component } from 'preact';
import day4ButtonStyle from '../day4Button/day4ButtonStyle';

export default class ButtonDay4 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day4ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
