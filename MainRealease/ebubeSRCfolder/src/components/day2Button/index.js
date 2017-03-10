// import preact
import { h, render, Component } from 'preact';
import day2ButtonStyle from '../day2Button/day2ButtonStyle';

export default class ButtonDay2 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day2ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
