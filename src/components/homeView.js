import './home.css';
import dragon from "./dragon-2.png"
import {Link} from "react-router-dom";


function HomeView(){
    return (
        <>
        <div className="background body">
            <img className="background-image" src="city.jpg"></img>
            <div className="dragon-div">
            <img className="dragon-img" src={dragon}></img></div>
  
        <div class="title">
            <h1>Dungeons and Dragons Character Generator</h1>
        </div>
        <div className="home-button"><Link to="/create">Go!</Link></div>

        </div>
        

        </>
    )
}
export default HomeView;