// import preact
import { h, render, Component } from 'preact';
import advicePageIconStyle from '../advicePageIconStyle';

export default class ButtonAdvicePage extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={advicePageIconStyle.container}>
				<img/>
			</div>
		);
	}
}
