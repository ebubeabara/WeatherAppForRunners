// import preact
import { h, render, Component } from 'preact';
import day7ButtonStyle from '../day7Button/day7ButtonStyle';

export default class ButtonDay7 extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={day7ButtonStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
