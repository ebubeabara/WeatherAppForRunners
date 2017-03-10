// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the pages of our app
import MainPage from '../MainPage';
import MapPage from '../MapPage';
import AdvicePage from '../AdvicePage';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
	}

	componentDidMount(){
		const urlBar = window.location.href;
		if(urlBar.includes("main")) {
			this.setState({
				mainPage: true,
				mapPage: false,
				advicePage: false
			});
		} else if(urlBar.includes("map")){
			this.setState({
				mainPage: false,
				mapPage: true,
				advicePage: false
			});
		} else if(urlBar.includes("adv")) {
			this.setState({
				mainPage: false,
				mapPage: false,
				advicePage: true
			});
		} else {
			this.setState({
				mainPage: true,
				mapPage: false,
				advicePage: false
			});
		}
	}

	// the main render method for the iphone component
	render = () => {
		if(this.state.mainPage){
			return (
				<div class={ style_iphone.container }>
                	<MainPage />
            	</div>			
			);
		} 
		else if(this.state.mapPage) {
			return (
				<div class={ style_iphone.container }>
                	<MapPage />
            	</div>	
			);
		} else {
			return (
				<div class={ style_iphone.container }>
					<AdvicePage />
				</div>
			)
		}
	}
}
