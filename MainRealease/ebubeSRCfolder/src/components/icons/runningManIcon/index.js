// import preact
import { h, render, Component } from 'preact';
import runningManIconStyle from '../runningManIconStyle';

export default class ButtonRunningMan extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div class={runningManIconStyle.container}>
				<img onClick={clickFunction}/>
			</div>
		);
	}
}
