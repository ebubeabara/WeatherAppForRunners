// import preact
import { h, render, Component } from 'preact';
import style from './style_iphone';
//import jquery for API calls
import $ from 'jquery';
// import other
import Map from '../map';
import ButtonAdvicePage from '../icons/advicePageIcon';
import ButtonHomePage from '../icons/homePageIcon';

export default class MapPage extends Component {
    // Constructor for MapPage component:
    // Sets up variables of the component instance for later use in other functions.
    // Also handles any and all parameters passed to the component.
    // And calls any and all needed functions for setup of component.
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div class={style.container}>
                <div class={style.title}>Weather Map</div>
                <Map />
                <div class={style.pageNavButton}>
					<a href={'/iphone/main'}><span class={style.mainButton}><ButtonHomePage/></span></a>
                    <a href={'/iphone/adv'}><span class={style.adviceButton}><ButtonAdvicePage/></span></a>
                </div>
            </div>
       );
    }
}
