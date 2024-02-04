import React, { useState } from 'react';
import './MarsMeteo.css';

import sunsetIcon from '../Assets/sunset.png';
import sunriseIcon from '../Assets/sunrise.png';
import clockIcon from '../Assets/clock.png';
import pressureIcon from '../Assets/pressure.png';

import sunny from '../Assets/sunny.png';
import night from '../Assets/night.png';
import sunset from '../Assets/sunsetIcon.png';



const RoverInfo = ({ selected }) => {
    if (selected) {
        return <div id="left">Curiosity Rover</div>;
    } else {
        return <div id="right">Perseverance Rover</div>;
    }
};

const MyComponent = () => {
    const [selected, setSelected] = useState(false);

    return (
        <div className='navbar'>
            <p id="toggle">
                <button onClick={() => setSelected(true)}>Curiosity</button>
                <button onClick={() => setSelected(false)}>Perseverance</button>     
            </p>
            <RoverInfo selected={selected} />
        </div>
    );
};



const MarsMeteo = () => {

    
let currentTime = 0;
let sunrise = 200;
let sunset = 800;

const isNightTime = () => {
    return currentTime > sunset || currentTime < sunrise;
};
    const getWeatherIcon = (sunrise, sunset, currentTime) => {
        
        if (Math.abs(currentTime - sunrise) < 30 || Math.abs(currentTime - sunset) < 30) {
            return sunset; 
        } else if(isNightTime()){
            return night; 
        }
         else return sunny; 
    };



    const backgroundStyle = {
        backgroundImage: isNightTime()
          ? 'linear-gradient(180deg, #002855 0%, #87CEEB 100%)' // Night gradient
          : 'linear-gradient(180deg, #cd450b 0%, #49181d 100%)', // Day gradient
      };

    return (

        <div className='container' style={backgroundStyle}>
            <MyComponent />
            <div className="weather-image">
                <img src={getWeatherIcon(sunrise,sunset,currentTime)} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">Mars</div>
            <div className="data-container">
                <div className="element">
                <img src={sunriseIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">0:00</div>
                        <div className="text">Sunrise</div>
                    </div>
                </div>
                <div className="element">
                <img src={sunsetIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">0:00</div>
                        <div className="text">Sunset</div>
                    </div>
                   
                </div>
                <div className="element">
                <img src={pressureIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">0.00</div>
                        <div className="text">Pressure(Pa)</div>
                    </div>
                </div>
                <div className="element">
                <img src={clockIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">0:00</div>
                        <div className="text">Sol</div>
                    </div>
        
                </div>
            </div>
        </div>
    );
};

export default MarsMeteo;