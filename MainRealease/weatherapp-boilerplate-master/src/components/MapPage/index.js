// import preact
import { h, render, Component } from 'preact';
import style from '../iphone/style';
//import jquery for API calls
import $ from 'jquery';
// import other
import Map from '../map';

export default class MapPage extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div class={style.container}>
                <div class={style.header}>
                    <div class={style.conditions}>Weather Map</div>
                </div>
                <Map />
            </div>
       );
    }
}
