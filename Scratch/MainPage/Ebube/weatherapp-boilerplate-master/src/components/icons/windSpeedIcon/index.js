// import preact
import { h, render, Component } from 'preact';
import windSpeedIconStyle from '../windSpeedIconStyle';

export default class ButtonWindSpeed extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={windSpeedIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
