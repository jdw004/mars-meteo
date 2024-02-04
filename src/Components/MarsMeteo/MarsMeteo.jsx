import React, { useEffect, useState } from 'react';
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
        return <div id="left"></div>;
    } else {
        return <div id="right"></div>;
    }
};

const MyComponent = ({selected, setSelected}) => {
    return (
        <div className='navbar'>
            <p id="toggle">
                <button className={selected ? 'selected' : ''} onClick={() => setSelected(true)}>Curiosity</button>
                <button className={!selected ? 'selected' : ''} onClick={() => setSelected(false)}>Perseverance</button>     
            </p>
            <RoverInfo selected={selected} />
        </div>
    );
};



const MarsMeteo = () => {
    const [selected, setSelected] = useState(false);
    const [currDayData, setCurrDayData] = useState({});
    const [CuriosityData, setCuriosityData] = useState({})
    const [PerseveranceData, setPerservanceData] = useState({})
    const [isNight, setNight] = useState(false); 
    const [isSunset, setSunset] = useState(false); 
    //const [avgTempC, setAvgTempC] = useState({})
    //const [avgTempP, setAvgTempP] = useState({})
    //const [avgTemp, setAvgTemp] = useState({})
    //PERSERVANCE
    useEffect(() => {
        async function fetchData(){

                //Perserverance
                const jsonResponse = await fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json");
                const data = await jsonResponse.json();
                const temperatureChart = data.sols.slice(0, 7).map(row => ({
                    terrestrial_date: row.terrestrial_date,
                    sol: row.sol,
                    max_temp: row.max_temp,
                    min_temp: row.min_temp,
                    pressure: row.pressure,
                    sunrise: row.sunrise,
                    sunset: row.sunset
                }));
                let fetchPerservance = temperatureChart[6]//last entry in 7 day period
                //use currDayData.sol, currDayData.sunrise, etc.
                //let PavgTemp = (temperatureChart[6].max_temp+temperatureChart[6].min_temp)/2
                
                setPerservanceData(fetchPerservance)
                //setAvgTempP(PavgTemp)
                
                //Curiosity
                const CuriousResponse = await fetch("https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json");
                const data2 = await CuriousResponse.json();
                const temperatureChart2 = data2.soles.slice(0, 7).map(row => ({
                    terrestrial_date: row.terrestrial_date,
                    sol: row.sol,
                    max_temp: row.max_temp,
                    min_temp: row.min_temp,
                    pressure: row.pressure,
                    sunrise: row.sunrise,
                    sunset: row.sunset
                }));
                
                let fetchCurious = temperatureChart2[0]//most recent entry in 7 day period
                //let CavgTemp = (temperatureChart2[0].max_temp+temperatureChart2[0].min_temp)/2
                //use currDayData.sol, currDayData.sunrise, etc.
                setCuriosityData(fetchCurious)
                //setAvgTempC(CavgTemp)
            }
            fetchData()
    }, []);
    useEffect(() => {

        

        if (selected){
            setCurrDayData(CuriosityData)
            //setAvgTemp(avgTempC)
        }
        else{
            setCurrDayData(PerseveranceData)
            
            //setMedianTemp(medianTempP)
        }

        let currentTime = getMinutesSinceMidnight;
        let sunriseTime = convertToMinutesSinceMidnight(currDayData.sunrise);
        let sunsetTime = convertToMinutesSinceMidnight(currDayData.sunrset);

        setNight(currentTime > sunsetTime || currentTime < sunriseTime);
        setSunset(Math.abs(currentTime - sunriseTime) < 30 || Math.abs(currentTime - sunsetTime) < 30);

    }, [selected]);
    

function getMinutesSinceMidnight() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return hours * 60 + minutes;
  }

  function convertToMinutesSinceMidnight(timeString) {
    if(timeString){
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
    } 
    return 0;
  }


    const getWeatherIcon = () => {
        
        if(isSunset) {return sunsetIcon;}
        if(isNight){return night;}
         else return sunny; 
    };
    
    

    const backgroundStyle = {
        backgroundImage: isNight
          ? 'linear-gradient(180deg, #002855 0%, #87CEEB 100%)' // Night gradient
          : 'linear-gradient(180deg, #cd450b 0%, #49181d 100%)', // Day gradient
      };
      
    return (
        
        <div className='container' style={backgroundStyle}>
        <div className="data">
            <div className = 'title'>Mars Meteo</div>
            </div>
           
            <MyComponent selected={selected} setSelected={setSelected}/>
            
    
           
            <div className="weather-image">
                <img src={getWeatherIcon()} alt="" />
            </div>
            <div className="weather-temp">{currDayData.min_temp}°C</div>
            <div className="data-container">
                <div className="element">
                <img src={sunriseIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">{currDayData.sunrise}</div>
                        <div className="text">Sunrise</div>
                    </div>
                </div>
                <div className="element">
                <img src={sunsetIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">{currDayData.sunset}</div>
                        <div className="text">Sunset</div>
                    </div>
                   
                </div>
                <div className="element">
                <img src={pressureIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">{currDayData.pressure}</div>
                        <div className="text">Pressure(Pa)</div>
                    </div>
                </div>
                <div className="element">
                <img src={clockIcon} alt="" className="icon"/>
                    <div className="data">
                        <div className="numbers">{currDayData.sol}</div>
                        <div className="text">Sol</div>
                    </div>
        
                </div>
            </div>
        </div>
    );
};

export default MarsMeteo;