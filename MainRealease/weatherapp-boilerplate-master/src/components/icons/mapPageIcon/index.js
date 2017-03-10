// import preact
import { h, render, Component } from 'preact';
import mapPageIconStyle from '../mapPageIconStyle';

export default class ButtonMapPage extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={mapPageIconStyle.container}>
				<img/>
			</div>
		);
	}
}
