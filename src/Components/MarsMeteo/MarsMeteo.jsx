import React from 'react'
import './MarsMeteo.css'


import windy from '../Assets/windy.png'
import windIcon from '../Assets/wind.png'
import humidityIcon from '../Assets/humidity.png'
import sunnyIcon from '../Assets/sunny.png'
import nightIcon from '../Assets/night.png'
import sunsetIcon from '../Assets/sunset.png'

const MarsMeteo = () => {
    return (
        <div className='container'>
           
            <div className="weather-image">
                <img src={sunnyIcon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="" className="icon"/>
                    <div className="data">
                        <diy className="humidity-percent">64%</diy>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                   <img src={windIcon} alt="" className="icon"/>
                    <div className="data">
                        <diy className="humidity-percent">20mph</diy>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarsMeteo