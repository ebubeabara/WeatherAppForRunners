// import preact
import { h, render, Component } from 'preact';
import day6ButtonStyle from '../day6Button/day6ButtonStyle';

export default class ButtonDay6 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day6ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
