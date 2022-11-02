import React, {useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, Alert } from '@mui/material';

type InitiProps = {
    capitalName: string;
};

interface InitCountryWeatherInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}

export const WeatherInfo: React.FC = () => {

    const { capitalName } = useParams<InitiProps>();
    const [weatherInfo, setWeatherInfo] = useState<InitCountryWeatherInfo>();
    const [weatherApiError, setWeatherApiError] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const getWeatherInfo = useCallback(async () => {
        setLoading(true);
        console.log('In weather Details component')
        try {
            const response = await axios.get(
                `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
            );
            const data = response.data;
            setWeatherInfo(data.current);
            setLoading(false);
        } catch (error) {
            setWeatherApiError(true);
        }
    }, [capitalName]);

    useEffect(() => {
        getWeatherInfo();
    }, [getWeatherInfo]);

    return (
        <Container maxWidth="md">
            <div>
                <br/>
                <br/>
                <h1>Weather Details</h1>
                {weatherInfo ? (
                    <div
                        className="weather-content"
                        data-testid="weather-details">
                        <br />
                        <br />
                        <img
                            src={weatherInfo.weather_icons[0] }
                            alt="Weather Icon"
                        />
                        <br/>
                        <br/>

                        <p>
                            Temperature: {weatherInfo.temperature}
                            <sup>o</sup>
                        </p>
                        <p>Wind Speed: {weatherInfo.wind_speed}</p>
                        <p>Precip: {weatherInfo.precip}</p>
                    </div>
                ) : (
                    <div>
                        {weatherApiError ? (
                            <Alert severity="warning">
                                Weather info not found. Please try again!
                            </Alert>
                        ) : (
                            <p>{loading ? 'Loading...' : ''}</p>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
    
}