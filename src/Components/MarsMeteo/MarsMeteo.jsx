import React, { useState } from 'react';
import './MarsMeteo.css';

import windy from '../Assets/windy.png';
import windIcon from '../Assets/wind.png';
import humidityIcon from '../Assets/humidity.png';
import sunnyIcon from '../Assets/sunny.png';
import nightIcon from '../Assets/night.png';
import sunsetIcon from '../Assets/sunset.png';

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
            return sunsetIcon; 
        } else if(isNightTime()){
            return nightIcon; 
        }
         else return sunnyIcon; 
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
            <div className="weather-location">MARS MF</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                   <img src={windIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">20mph</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarsMeteo;
