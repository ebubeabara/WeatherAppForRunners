// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';

export default class Map extends Component {
    // Constructor for Map component:
    // Sets up variables of the component instance for later use in other functions.
    // Also handles any and all parameters passed to the component.
    // And calls any and all needed functions for setup of component.
    constructor(props) {
        super(props);
        this.setState({
            latitude: "",
            longitude: "",
            map: "",
            directionsService: "",
            directionsDisplay: "",
            geoJSON: {
                type: "FeatureCollection",
                features: []
            },
            infoWindow: "",
            OpenWeatherMapKey: "970e68954a42124e8099a7920de8b8bf"
        });
    }

    // Function getGeoLocation of Map component:
    // Uses navigator.geolocation to get latitude and longitude coordinates of user agent
    // Then calls either positionCallback or positionFail depending on whether or not it succeeded.
    getGeoLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.positionCallback, this.positionFail, {timeout: 10000});
        } else { 
            console.log("Geolocation not supported in this browser");
        }
    }

    // Function positionCallback of Map component:
    // sets lat and lng variables of the Map components after a successful getGeoLocation() callback
    // then pans the current map to the location of those coordinates.
    positionCallback = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        this.panMapToLocation(this.state.latitude, this.state.longitude);
        this.initDirectionService();
        this.getWeatherData();
    }

    // Function positionFail of Map component:
    // Outputs an error messages to console to let dev know that the getGeoLocation() function
    // did not succeed in getting the coordinates of the user.
    positionFail = () => {
        console.log("ERROR: Failed to get geolocation.");
    }

    // Function initMap of Map component:
    // First calls the getGeoLocation function to asynchronously get the coordinates of the user that will affect map center position later
    // Then initializes the google map instance in the map canvas div in the DOM with the mapOptions set.
    initMap = () => {
        this.getGeoLocation();
        var latlng = new google.maps.LatLng(this.state.latitude, this.state.longitude);
        var mapOptions = {
            zoom: 11,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.state.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    }

    // Function initDirectionService of map Component:
    // This function initializes all the google maps direction service variables required to display the directions of the users
    // planned trip on the map, it then calls the functions to display the route and compute the total distance.
    initDirectionService = () => {
        var directionsOptions = {
            draggable: true,
            map: this.state.map,
            panel: null
        }
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer(directionsOptions);

        this.setState({
            directionsService: directionsService,
            directionsDisplay: directionsDisplay
        });

        window.computeTotalDistance = this.computeTotalDistance;
        this.state.directionsDisplay.addListener('directions_changed', function() {
            computeTotalDistance(directionsDisplay.getDirections());
        });

        var bounds = this.state.map.getBounds();
        var origin = this.state.map.getCenter();
        var destination = bounds.getSouthWest();

        this.displayRoute(origin, destination, this.state.directionsService, this.state.directionsDisplay);
    }

    // Function computeTotalDistance of Map component:
    // Computes the total distance between the two points on the map and displays it in the total_distance span
    // located beneath the map on the page, original code found in the google documentation of its maps js library
    computeTotalDistance = (result) => {
        var total = 0;
        var myroute = result.routes[0];
        for(var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById("total_distance").innerHTML = total + " km";
    }

    // Function displayRoute of Map component:
    // This takes in the origin and destination points of the user, as well as the google maps directions and direction display service
    // Then after assigning correct options and creating the route with the directions service, and then displays it through the 
    // set direction function of the directionsDisplay.
    displayRoute = (origin, destination, directionsService, directionsDisplay) => {
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: "WALKING",
            avoidTolls: true,
        }, function(response, status) {
            if(status === "OK") {
                directionsDisplay.setDirections(response);
            } else {
                console.log("ERROR: Could not display direction service due to " + status);
            }
        });
    }

    // Function panMapToLocation of Map component:
    // First initializes a google maps latlng variable with the latitude and longitude values passed as parameters.
    // Then pans the current map instances of the components to center on that location.
    panMapToLocation = (lat, lng) => {
        var latlng = new google.maps.LatLng(lat, lng);
        this.state.map.panTo(latlng);
    }

    // Function getWeatherData of Map component:
    // 
    getWeatherData = () => {
        // Getting bounds to get the different latitiudes and longitude boundaries for the openweathermap api to call on
        var bounds = this.state.map.getBounds();
        var northEast = bounds.getNorthEast();
        var southWest = bounds.getSouthWest();
        var northLat = northEast.lat();
        var southLat = southWest.lat();
        var eastLng = northEast.lng();
        var westLng = southWest.lng();

        // Creating the url for the ajax request later
        var url = "http://api.openweathermap.org/data/2.5/box/city?bbox=" + westLng + "," + northLat + "," + eastLng + "," + southLat
            + "," + this.state.map.getZoom() + "&cluster=yes&format=json&APPID=" + this.state.OpenWeatherMapKey;

        // Add parseWeatherResult to global context so that it can be called within the ajax unnamed function context
        window.parseMapWeatherResult = this.parseWeatherResult;

        // Ajax request
        $.ajax({
            url: url,
            success: function(result) {
                parseMapWeatherResult(result);
            }
        });
    }

    // Function parseWeatherResult of Map component:
    //
    parseWeatherResult = (result) => {
        if(result.list.length > 0) {
            for(var i = 0; i < result.list.length; i++) {
                this.state.geoJSON.features.push(this.jsonToGeoJSON(result.list[i]))
            }
            this.drawWeatherIcons(this.state.geoJSON);
            this.initInfoWindow();
        }
    }

    // Function jsonToGeoJSON of Map component:
    //
    jsonToGeoJSON = (jsonItem) => {
        // Create the gepJson item from the jsonItem parament
        var feature = {
            type: "Feature",
            properties: {
                city: jsonItem.name,
                weather: jsonItem.weather[0].main,
                temperature: jsonItem.main.temp,
                min: jsonItem.main.temp_min,
                max: jsonItem.main.temp_max,
                humidity: jsonItem.main.humidity,
                pressure: jsonItem.main.pressure,
                windSpeed: jsonItem.wind.speed,
                windDegrees: jsonItem.wind.deg,
                windGust: jsonItem.wind.gust,
                icon: "http://openweathermap.org/img/w/" + jsonItem.weather[0].icon + ".png",
                coordinates: [jsonItem.coord.lon, jsonItem.coord.lat]
            },
            geometry: {
                type: "Point",
                coordinates: [jsonItem.coord.lon, jsonItem.coord.lat]
            }
        };

        //console.log(feature);
        // Now we set the custom icon in the map
        this.state.map.data.setStyle(function(feature) {
            return {
                icon: {
                    url: feature.getProperty('icon'),
                    anchor: new google.maps.Point(25,25)
                }
            };
        });

        // Now return the geoJson object
        return feature;
    }
    
    // Function drawWeatherIcons of Map component:
    //
    drawWeatherIcons = (geoJSON) => {
        this.state.map.data.addGeoJson(geoJSON);
    }

    // Function initInfoWindow of Map component: 
    //
    initInfoWindow = () => {
        var infowindow = new google.maps.InfoWindow();
        var map = this.state.map;
        map.data.addListener('click', function(event) {
            console.log(event);
            infowindow.setContent(
                "<img src=" + event.feature.getProperty("icon") + "><p style='color:black;'>" +
                    "<br /><strong>" + event.feature.getProperty("city") + "</strong>" +
                    "<br />" + event.feature.getProperty("temperature") + "&deg;C" +
                    "<br />" + event.feature.getProperty("weather")+"</p>"
            );
            infowindow.setOptions({
                position: {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                },
                pixelOffset: {
                    width: 0,
                    height: -15
                }
            });
            infowindow.open(map);
        });

        this.setState({
            infoWindow: infowindow
        });
    }

    // Function loadJS of Map component:
    // Gets passed a url for a js library to async load it propertly
    // Creates a script tag for the js lib passed to it then inserts it to the correct place in the DOM
    // Original idea for this function is from Klaas of www.klaasnotfound.com.
    loadJS = (src) => {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    }

    // Lifecycle function componentDidMount of Map component:
    // Sets the initMap function of the mapComponent to the global scope so that the google maps js library can callback on that function when loaded
    // Then uses the loadJS function of the Map component to asynchrously load the google maps js library properly.
    componentDidMount = () => {
        window.initMap = this.initMap;
        this.loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyC0RF-46qEOCQedGA3ZY13QusfzgO8JS8Q&callback=initMap");
    }

    // Lifecycle function shouldComponentUpdate of Map component:
    // This always returns false because we do not want to update since if the component would,
    // it would reset the map and render over the data inserted into the html for the map.
    shouldComponentUpdate = (nextProps, nextState) => {
        return false;
    }

    // Lifecycle function render of Map component:
    // Returns the html elements of the component to the parent component.
    render = () => {
        return (
            <div>
                <div id="map_canvas" style="height: 500px; width: 414px;"></div>
                <p>Total Distance: <span id="total_distance"></span></p>
            </div>
        );
    }
}