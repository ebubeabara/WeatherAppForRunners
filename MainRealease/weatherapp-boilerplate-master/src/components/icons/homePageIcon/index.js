// import preact
import { h, render, Component } from 'preact';
import mainPageIconStyle from '../mainPageIconStyle';

export default class ButtonHomePage extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={mainPageIconStyle.container}>
				<img/>
			</div>
		);
	}
}
