//import preact
import { h, render, Component} from 'preact';

export default class Location extends Component
{
    //rendering a function when the button is clicked
    render({currentLocationFunction})
    {
        if(!currentLocationFunction)
        {
            currentLocationFunction = () => {
                console.log("passed something as 'currentLocationFunction' that wasn't a function !");
            }
        }
        return (
            <div>
                <button onClick={currentLocationFunction}>
                    Current Place
                </button>
            </div>
        );
    }
}
