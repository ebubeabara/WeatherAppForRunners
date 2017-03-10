// import preact
import { h, render, Component } from 'preact';
import rainyIconStyle from '../rainyIconStyle';

export default class ButtonRainy extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={rainyIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
