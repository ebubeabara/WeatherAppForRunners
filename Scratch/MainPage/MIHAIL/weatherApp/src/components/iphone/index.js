// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		//this.setState({ display: true });
        this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/0cb54acb69b0ecce/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		//this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
        
        var {locate, temp, humidity, feels, wind} = this.state;
        
        
        
        
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{locate}</div>
					<div class={ style.temperature }>{temp}</div>
                    <div class={ style.temperatureCircle }>
                    <h1> o </h1>
                    </div>
                    <div class={ style.humidity }>{humidity}</div>
                    <div class={ style.humidityPicture }>
                    <img src={"http://icons.iconarchive.com/icons/custom-icon-design/lovely-weather-2/256/Humidity-icon.png"} height={100}/>
                    </div>
                    <div class={ style.humidityText }>
                    <h1>Humidity</h1>
                    </div>
            
                    <div class={ style.feels }>{feels}</div> 
                    <div class={ style.feelsPicture }>
                    <img src={"http://findicons.com/files/icons/2770/ios_7_icons/512/t_shirt.png"} height={55}/>
                    </div>
                    <div class={ style.feelsText }>
                    <h1>Feels Like </h1>
                    </div>
            
                    <div class={ style.wind  }>
                    {wind}</div>
                    <div class={ style.windPicture }>
                    <img src={"https://d30y9cdsu7xlg0.cloudfront.net/png/6030-200.png"} height={100}/>
                    </div>
                    <div class={ style.windText }>
                        <h1>Wind</h1>
                    </div>
                    
				</div>
				<div class={ style.details }></div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
        var humidity_c = parsed_json['current_observation']['relative_humidity'];
        var feels_c = parsed_json['current_observation']['feelslike_c'];
        var wind_k = parsed_json['current_observation']['wind_kph'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
            humidity: humidity_c,
            feels: feels_c,
            wind: wind_k,
			
		});      
	}
}