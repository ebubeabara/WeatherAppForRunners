// import preact
import { h, render, Component } from 'preact';
import humidityIconStyle from '../humidityIconStyle';

export default class ButtonHumidity extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={humidityIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
