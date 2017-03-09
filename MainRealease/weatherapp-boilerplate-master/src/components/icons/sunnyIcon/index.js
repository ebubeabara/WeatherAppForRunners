// import preact
import { h, render, Component } from 'preact';
import sunnyIconStyle from '../sunnyIconStyle';

export default class ButtonSunny extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={sunnyIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
