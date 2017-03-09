// import preact
import { h, render, Component } from 'preact';
import feelsLikeTextIconStyle from '../feelsLikeTextIconStyle';

export default class ButtonFeelsLikeText extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={feelsLikeTextIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
