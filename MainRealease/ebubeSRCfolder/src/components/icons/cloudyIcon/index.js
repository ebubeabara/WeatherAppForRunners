// import preact
import { h, render, Component } from 'preact';
import cloudyIconStyle from '../cloudyIconStyle';

export default class ButtonCloudy extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={cloudyIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
