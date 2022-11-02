import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { CountryInfo } from './components/CountryInfo';
import { WeatherInfo } from './components/WeatherInfo';

function App() {
    return (
        <div className="App" data-testid="app-component-test-id">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:name" element={<CountryInfo />} />
                <Route path="/details/weather/:capitalName" element={<WeatherInfo />} />
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </div>
    );
}

export default App;
