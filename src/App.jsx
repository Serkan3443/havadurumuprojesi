import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);//weatherData: Bu deðiþken, hava durumu verilerini tutacak olan durum (state) deðiþkenidir.setWeatherData: Bu ise weatherData deðiþkenini güncellemek için kullanýlan fonksiyondur (setter).useState(null): Ýlk deðer olarak null verilmiþtir. Yani, baþlangýçta weatherData deðiþkeni boþ olarak tanýmlanmýþtýr.
    const [location, setLocation] = useState('');

    // useEffect hook'u ile veri çekme iþlemi
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Axios ile hava durumu API'sine GET isteði gönderilmesi
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&lang=tr&days=4&aqi=yes&alerts=yes`);

                // API'den gelen verinin state'e atanmasý
                setWeatherData(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        // location state'i ve VITE_WEATHER_API deðiþkeni deðiþtiðinde fetchData fonksiyonunun çaðrýlmasý
        if (location && import.meta.env.VITE_WEATHER_API) {
            fetchData();
        }
    }, [location]);// useEffect'in sadece location state'i deðiþtiðinde çalýþmasý için dependency array

    // Kullanýcýdan location (þehir) bilgisini alacak fonksiyon
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
