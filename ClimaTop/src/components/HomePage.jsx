import { useState, useEffect } from 'react';
import { getWeatherData } from '../services/weatherApi';

const HomePage = ({ onNavigateToSearch }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!navigator.geolocation) {
        throw new Error('Localização GPS indisponível neste navegador');
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherDataByCoords(latitude, longitude);
          setCurrentWeather(weatherData);
          setLoading(false);
        },
        (error) => {
          console.error('Erro de geolocalização:', error);
          setError('Impossível identificar sua posição atual. Tente pesquisar por uma localidade específica.');
          setLoading(false);
        }
      );
    } catch (err) {
      setError('Falha ao identificar posição atual');
      setLoading(false);
    }
  };

  const getWeatherDataByCoords = async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '4d8fb5b93d4af21d66a2948710284366';
      const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';
      
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      
      if (!response.ok) {
        throw new Error('Falha ao carregar informações meteorológicas');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <h1 className="hero-title">ClimaTop</h1>
        <p className="hero-subtitle">Seu portal de confiança para previsões meteorológicas</p>
        <div className="hero-description">
          <p>Acesse informações climáticas exatas e atualizadas de qualquer localidade global.</p>
          <p>Dados frescos, design intuitivo e navegação simplificada.</p>
        </div>
      </div>

      <div className="current-weather-section">
        <h2>Condições climáticas locais</h2>
        {loading && (
          <div className="loading-weather">
            <div className="loading-spinner"></div>
            <p>Identificando sua posição...</p>
          </div>
        )}
        
        {error && (
          <div className="error-weather">
            <p>{error}</p>
            <button onClick={getCurrentLocationWeather} className="retry-button">
              Tentar mais uma vez
            </button>
          </div>
        )}
        
        {currentWeather && (
          <div className="current-weather-card">
            <div className="weather-header">
              <h3>{currentWeather.name}, {currentWeather.sys?.country}</h3>
              <div className="weather-icon">{getWeatherIcon(currentWeather.weather[0].icon)}</div>
            </div>
            <div className="weather-main">
              <div className="temperature">{Math.round(currentWeather.main.temp)}°C</div>
              <div className="description">{currentWeather.weather[0].description}</div>
            </div>
            <div className="weather-details">
              <div className="detail">
                <span className="detail-icon">🌡️</span>
                <span>Percepção: {Math.round(currentWeather.main.feels_like)}°C</span>
              </div>
              <div className="detail">
                <span className="detail-icon">💧</span>
                <span>Umidade: {currentWeather.main.humidity}%</span>
              </div>
              <div className="detail">
                <span className="detail-icon">💨</span>
                <span>Ventos: {currentWeather.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cta-section">
        <h2>Descubra o tempo mundial</h2>
        <p>Explore as condições meteorológicas de qualquer destino no planeta</p>
        <button onClick={onNavigateToSearch} className="cta-button">
          Pesquisar Clima
          <span className="button-icon">🔍</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
