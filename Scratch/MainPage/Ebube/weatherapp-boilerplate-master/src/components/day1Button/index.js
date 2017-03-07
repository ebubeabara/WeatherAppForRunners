// import preact
import { h, render, Component } from 'preact';
import day1ButtonStyle from '../day1Button/day1ButtonStyle';

export default class ButtonDay1 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day1ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
