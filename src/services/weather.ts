const API_KEY = import.meta.env.VITE_API_KEY;
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
}

interface GeoLocation {
  lat: number;
  lon: number;
  name: string;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  if (!city.trim()) {
    throw new Error('Please enter a city name');
  }

  if (!API_KEY || API_KEY === 'your_openweathermap_api_key_here') {
    throw new Error('Please configure your OpenWeatherMap API key in the .env file');
  }

  const geoData = await fetchGeoLocation(city);
  const weatherData = await fetchWeatherData(geoData.lat, geoData.lon);

  return {
    city: geoData.name,
    temperature: Math.round(weatherData.main.temp),
    condition: weatherData.weather[0].main,
    humidity: weatherData.main.humidity,
    windSpeed: Math.round(weatherData.wind.speed * 3.6),
    icon: weatherData.weather[0].icon,
    description: weatherData.weather[0].description,
  };
}

async function fetchGeoLocation(city: string): Promise<GeoLocation> {
  const url = `${GEO_API_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch location data');
  }

  const data = await response.json();

  if (!data || data.length === 0) {
    throw new Error('City not found. Please check the spelling and try again');
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
  };
}

async function fetchWeatherData(lat: number, lon: number) {
  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}
