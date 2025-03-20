import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';

const Home = () => {
    const [cityName, setCityName] = useState('');
    const [cityWeather, setCityWeather] = useState<any>({});

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`http://api.weatherstack.com/forecast?access_key=ba72c8ec314bfae4f773a4ee68df3bb3&query=${cityName}&forcast_days=7`);
                const data = response.data;
                const forecastDate = data?.forecast ? Object.keys(data.forecast) : [];
                const firstForecast = forecastDate.length > 0 ? data.forecast[forecastDate[0]] : '';
                setCityWeather({
                    location: data?.location,
                    current: data?.current,
                    firstForecast
                });
                console.log(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        fetchWeather();
    }, [cityName]);

    const promiseOptions = () => {

    }

    console.log('------->', cityWeather.firstForecast);

    return (
        <div className='container' style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className='backCard gap-4 p-4 shadow-lg'>
                <div className='gap-2 flex-col' style={{ display: 'flex'}}>
                    <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions}/>
                    <button className='btn btn-danger' type='submit' >Search</button>
                </div>
                {cityWeather.current && cityWeather.location != undefined ?
                    <div className='text-center'>
                        <h4 className='my-4 text-white'>{cityWeather.location?.name}, {cityWeather.location?.country}</h4>
                        <h6 className='text-danger'>{cityWeather.current?.weather_descriptions}</h6>
                        <h1 className='m-0 text-white'>{cityWeather.current?.temperature}°</h1>
                        <div className='d-flex justify-content-center gap-4 mt-4'>
                            <div>
                                <p className='text-danger'>Min</p>
                                <h6 className='text-white'>{cityWeather.firstForecast.mintemp || 0}°</h6>
                            </div>
                            <div>
                                <p className='text-danger'>Max</p>
                                <h6 className='text-white'>{cityWeather.firstForecast.maxtemp || 0}°</h6>
                            </div>
                        </div>
                    </div>
                    :
                    <h5 className='text-center text-white'>
                        ABC Weather Forecaster
                    </h5>
                }
            </div>
        </div>
    );
};

export default Home;