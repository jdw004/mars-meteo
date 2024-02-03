import React from 'react'
import './MarsMeteo.css'

import searchIcon from '../Assets/search.png'
import windIcon from '../Assets/wind.png'
import snowIcon from '../Assets/snow.png'
import rainIcon from '../Assets/rain.png'
import humidityIcon from '../Assets/humidity.png'
import drizzleIcon from '../Assets/drizzle.png'
import cloudIcon from '../Assets/cloud.png'
import clearIcon from '../Assets/clear.png'

const MarsMeteo = () => {
    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className="cityInput" placeholder='Search'/>
                <div className="search-icon">
                    <img src={searchIcon} alt="" />
                </div>
            </div>
            
        </div>
    )
}

export default MarsMeteo