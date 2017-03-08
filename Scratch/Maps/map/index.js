// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';

export default class Map extends Component {
    constructor(props) {
        super(props);
        
        this.setState({
            mapsurl: "",
            OpenWeatherMapKey: "970e68954a42124e8099a7920de8b8bf"
        });

        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.positionCallback, this.positionFail, {timeout: 10000});
        } else { 
            console.log("Geolocation not supported in this browser");
        }
    }

    positionCallback = (position) => {
        this.setState({
            mapsurl: "https://www.google.com/maps/embed/v1/view?zoom=11&center=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyC0RF-46qEOCQedGA3ZY13QusfzgO8JS8Q"
        });
    }

    positionFail = () => {
        console.log("Failed to get geolocation");
    }

    // render function
    render() {
        return (
            <div>
                <iframe width="668" height="824" frameborder="0" style="border:0" src={this.state.mapsurl} allowFullScreen></iframe>
            </div>
        );
    }
}