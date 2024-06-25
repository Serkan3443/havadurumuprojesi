import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&lang=tr&days=4&aqi=yes&alerts=yes`);
                setWeatherData(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (location && import.meta.env.VITE_WEATHER_API) {
            fetchData();
        }
    }, [location]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);//
    };

    return (
        <>
            <div className='app-container'>
                <h1 className='app-title'>HAVA DURUMU UYGULAMASI</h1>
                <div className='input-container'>
                    <input className='location-input' type='text' placeholder='Sehir Giriniz' value={location} onChange={handleLocationChange} />
                </div>
            </div>

            {weatherData && (
                <div className='weather-container'>
                    {weatherData.forecast.forecastday.map((day) => (
                        <div className='day-container' key={day.date}>
                            <h2 className='date'>{day.date}</h2>{/*Tarih alanýný gösterir*/}
                            <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text} />{/*hava durumunun ikon olarak gösterir*/}
                            <p className='temperature'>{day.day.avgtemp_c} &deg;C</p>
                            <p className='temperature'>{day.day.condition.text} C</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default App;
