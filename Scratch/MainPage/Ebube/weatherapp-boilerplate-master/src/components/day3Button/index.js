// import preact
import { h, render, Component } from 'preact';
import day3ButtonStyle from '../day3Button/day3ButtonStyle';

export default class ButtonDay3 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day3ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
