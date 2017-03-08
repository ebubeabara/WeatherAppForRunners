// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import titleStyle from '../title/titleStyle';
import buttonStyle from '../recButton/buttonStyle';
import clothesTitleStyle from '../clothesTitle/clothesTitleStyle';
import clothesInfoStyle from '../clothesInfo/clothesInfoStyle';
import style_map_iphone from '../button2/style_map_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the Title component
import Title from '../title';
//import the Button2 component
import Button2 from '../button2';
//import the Gym/Park title
import GymPark_Button from '../recButton';
//import the clothes Title component
import Clothes_Title from '../clothesTitle';
//import the clothes Info component
import Clothes_Info from '../clothesInfo';


export default class Iphone extends Component {
//var Iphone = React.createClass({

    
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		
		// button display state
        this.state.showRecs = true;
	}
    
    
    
    

    //this is the api fro current weather 
   fetchCurrentWeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseCurrentWeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({
			showRecs: false
		});
	}

	parseCurrentWeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay()];

		
		var conditionText = parsed_json['current']['condition']['text'];
		

		
         var showClothesInfo="";
        var gymParkTitle="";
        
        
        
        var cText = conditionText.toLowerCase();
		var displayRecommendation = "";
		if((cText.includes("sun"))|(cText.includes("clear"))|(cText.includes("shin"))|(cText.includes("dry")))
		{
            //this is where the image is going to go
			var img = createImage("../.png");
            //the text to display
            
            
			showClothesInfo="great";
            gymParkTitle="Park";
            show
            
            
            
     
            
		}
		else if((cText.includes("rain"))|(cText.includes("drizzle"))|(cText.includes("storm"))|(cText.includes("wet"))|(cText.includes("shower")))
		{
			var img = createImage("../../assets/design/gymBackground.jpg");
			showClothesInfo="test";
            gymParkTitle="Gym";
            
   
		}
		else if((cText.includes("snow")))
		{
			var img = createImage("../../assets/design/gymBackground.jpg");
			showClothesInfo="snow";
            gymParkTitle="Gym";
            
           
		}
		else
		{
			var img = createImage("../../assets/design/gymBackground.jpg");
			
            showClothesInfo="cloudy";
            gymParkTitle="Gym";
            
           
            
		}
    
        

		this.setState({
			
			displayConditionText: conditionText,
            showValue: showClothesInfo,
            showGymParkTitle: gymParkTitle,
			
		})
	}
    
    
    //call to a local jason file
    

    
    
    
    

	// the main render method for the iphone component
	render() {
        
		// display all weather data
        // show title
        var userMessage;
        var park = "Park";
        if(this.state.showGymParkTitle){
            
            userMessage = 
            <div class={style.backgroundPark}>
                    <h2>{this.state.showGymParkTitle}</h2>
                     <div class={ style.gymLogo }>
                       <img src={'../../assets/design/ParkLogo.png'} height={300}/>
                      </div>
                       
                           <center><h3>Address: 15 Godward Square, London E1 4FZ</h3>
                                <h3>Hours: Wednesday	7am–10:30pm,Thursday	7am–10:30pm,Friday	7am–9pm, Saturday	10am–6pm,Sunday	10am–6pm,Monday	7am–10:30pm,Tuesday	7am–10:30pm</h3>
                                <h3> Phone: 020 7882 8040  </h3>
                               </center>
                               
                    
                    <div>
                        <h2>{this.state.showClothes}</h2>
                        <h3>{this.state.showValue}</h3>
                    </div>
                <div class= { style_iphone.container }>
                        <Button/>
                        <Button2/>
                </div>
            
            </div>
        }else{
            var gym = "Gym";
            if(this.state.showGymParkTitle){
               userMessage = 
            <div class={style.backgroundGym}>
                      <h2>{this.state.showGymParkTitle}</h2>
                     <div class={ style.gymLogo }>
                       <img src={'../../assets/design/gymLogo.png'} height={300}/>
                            </div>
                    <div>
                        <h2>{this.state.showClothes}</h2>
                        <h3>{this.state.showValue}</h3>
                    </div>
                <div class= { style_iphone.container }>
                        <Button/>
                        <Button2/>
                </div>
            </div>
            }else{
                
                
            }
            
        }
        
		return (
			<div class={ style.container}>
                <div class={ buttonStyle.container }>
                        { this.state.showRecs ? <GymPark_Button class={buttonStyle.recButton }  clickFunction={  this.fetchCurrentWeatherData }/ > : null }
                </div>
                <div>
                    {userMessage}
                </div>
			</div> 
		);
	}
   
    

}
    
    var lat;
var lon;
var latitudeLongitude;
var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};
navigator.geolocation.watchPosition(success, error, options);
function success(pos) {

	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
	latitudeLongitude = lat + "," + lon;
	//latitudeLongitude = pos.coords.latitude + "," + pos.coords.longitude;
};
function error(err)
{
	console.warn(`ERROR(${err.code}): ${err.message}`);
};


/*
CALCULATE DISTANCE BETWEEN TWO POINTS USING LATITUDE AND LONGITUDE
*/


/*
CREATE IMAGE FUNCTION foro all icons
*/
function createImage(src)
{
	var img = new Image();
	img.src = src;
	return img;
}