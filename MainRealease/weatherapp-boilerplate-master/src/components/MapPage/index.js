// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
//import jquery for API calls
import $ from 'jquery';
// import other
import Map from '../map';

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
                <div>Weather Map</div>
                <Map />
            </div>
       );
    }
}
