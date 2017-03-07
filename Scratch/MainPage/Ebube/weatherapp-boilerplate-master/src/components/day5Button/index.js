// import preact
import { h, render, Component } from 'preact';
import day5ButtonStyle from '../day5Button/day5ButtonStyle';

export default class ButtonDay5 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day5ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
