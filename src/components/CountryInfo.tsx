import React, { FormEvent, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Alert } from '@mui/material';

type InitiProps = {
    name: string;
};

interface InitCountry {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        svg: string;
    };
}

export const CountryInfo: React.FC = () => {
    const { name } = useParams<InitiProps>();
    const [countryInfo, setCountryInfo] = useState<InitCountry>();
    const [capitalName, setCapitalName] = useState('');
    const [countryApiError, setCountryApiError] = useState<Boolean>(false);
    const navigate = useNavigate();

    const getCountryData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${name}`
            );
            const data = response.data;
            setCountryInfo(data[0]);
            setCapitalName(data[0].capital[0]);
        } catch (error) {
            setCountryApiError(true);
        }
    }, [name]);

    useEffect(() => {
        getCountryData();
    }, [getCountryData]);

    const getWeatherInfo = async (e: FormEvent) => {
        e.preventDefault();
        console.log('calling weather Details')
        navigate(`/details/weather/${capitalName}`);
    };

    const getBackToHome = (e: FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <Container maxWidth="md">
            <div>
                <br/>
                <br/>
                <h1>Country Details</h1>
                <br/>
                

                {countryInfo ? (
                    <div data-testid="country-info">
                    <img src={countryInfo.flags.svg} height="200px" alt="" />
                    <br/>
                        <br/>
                        <p>Capital: {countryInfo.capital[0]}</p>
                        <p>Population: {countryInfo.population}</p>
                        <p>
                            Latitude: {countryInfo.latlng[0]}
                            <sup>o</sup>
                        </p>
            
                        <p>
                            Longitude: {countryInfo.latlng[1]}
                            <sup>o</sup>
                        </p>
                        <br />
                        <br />
                        <Button
                            size="medium"
                            variant="contained"
                            onClick={getWeatherInfo}>
                            Capital Weather
                        </Button>
                    </div>
                ) : (
                    <div>
                        {' '}
                        {countryApiError ? (
                            <>
                                <Alert severity="warning" sx={{ m: 2 }}>
                                    Country info not found!
                                </Alert>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    onClick={getBackToHome}>
                                    Please try aging
                                </Button>
                            </>
                        ) : (
                            'Loading...'
                        )}
                    </div>
                )}

            </div>
        </Container>
    );
};
