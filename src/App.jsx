import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);//weatherData: Bu de�i�ken, hava durumu verilerini tutacak olan durum (state) de�i�kenidir.setWeatherData: Bu ise weatherData de�i�kenini g�ncellemek i�in kullan�lan fonksiyondur (setter).useState(null): �lk de�er olarak null verilmi�tir. Yani, ba�lang��ta weatherData de�i�keni bo� olarak tan�mlanm��t�r.
    const [location, setLocation] = useState('');

    // useEffect hook'u ile veri �ekme i�lemi
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Axios ile hava durumu API'sine GET iste�i g�nderilmesi
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&lang=tr&days=4&aqi=yes&alerts=yes`);

                // API'den gelen verinin state'e atanmas�
                setWeatherData(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        // location state'i ve VITE_WEATHER_API de�i�keni de�i�ti�inde fetchData fonksiyonunun �a�r�lmas�
        if (location && import.meta.env.VITE_WEATHER_API) {
            fetchData();
        }
    }, [location]);// useEffect'in sadece location state'i de�i�ti�inde �al��mas� i�in dependency array

    // Kullan�c�dan location (�ehir) bilgisini alacak fonksiyon
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
                            <h2 className='date'>{day.date}</h2>{/*Tarih alan�n� g�sterir*/}
                            <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text} />{/*hava durumunun ikon olarak g�sterir*/}
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
