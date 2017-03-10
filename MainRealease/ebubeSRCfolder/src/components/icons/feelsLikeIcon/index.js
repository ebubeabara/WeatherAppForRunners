// import preact
import { h, render, Component } from 'preact';
import feelsLikeIconStyle from '../feelsLikeIconStyle';

export default class ButtonFeelsLike extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={feelsLikeIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
