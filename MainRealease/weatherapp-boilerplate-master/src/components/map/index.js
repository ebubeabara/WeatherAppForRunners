// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';

export default class Map extends Component {
    constructor(props) {
        super(props);
        
        this.setState({
            latitude: "",
            longitude: "",
            map: "",
            OpenWeatherMapKey: "970e68954a42124e8099a7920de8b8bf"
        });
    }

    getGeoLocation = () => {
        console.log("Getting geolocation");
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.positionCallback, this.positionFail, {timeout: 10000});
        } else { 
            console.log("Geolocation not supported in this browser");
        }
    }

    positionCallback = (position) => {
        console.log("Geolocation:");
        console.log(position);
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }

    positionFail = () => {
        console.log("Failed to get geolocation");
    }

    initMap = () => {
        console.log("Initializing map...");
        this.getGeoLocation();
        console.log("Latitude: " + this.state.latitude + ", Longitude: " + this.state.longitude);
        var latlng = new google.maps.LatLng(this.state.latitude, this.state.longitude);
        var mapOptions = {
            zoom: 11,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.state.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        //var map = new google.maps.Map(this.refs.map.getDOMNode(), mapOptions);
        console.log("Map should be initialized.");
    }

    componentDidMount = () => {
        window.initMap = this.initMap;
        this.loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyC0RF-46qEOCQedGA3ZY13QusfzgO8JS8Q&callback=initMap");
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return false;
    }

    loadJS = (src) => {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    // render function
    render = () => {
        console.log("render called");
        return (
            <div id="map_canvas" style="height: 500px; width: 600px;"></div>
        );
    }
}