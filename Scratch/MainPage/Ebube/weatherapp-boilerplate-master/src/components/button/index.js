// import preact
import { h, render, Component } from 'preact';

export default class Button extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div>
				<button onClick={clickFunction}>
					Display Weather
				</button>
			</div>
		);
	}
}

// export default class Location extends Component{
// 	//rendering a function when the button is clicked
//     render({currentLocationFunction})
//     {
//         if(!currentLocationFunction)
//         {
//             currentLocationFunction = () => {
//                 console.log("passed something as 'currentLocationFunction' that wasn't a function !");
//             }
//         }
//         return (
//             <div>
//                 <button onClick={currentLocationFunction}>
//                     Current Place
//                 </button>
//             </div>
//         );
//     }
// }
