import { Cloud, Droplets, Wind, MapPin } from 'lucide-react';
import { WeatherData } from '../services/weather';

interface WeatherDisplayProps {
  weather: WeatherData;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 w-full max-w-md transform transition-all duration-500 hover:scale-105">
      <div className="flex items-center justify-center mb-6 gap-2">
        <MapPin className="w-6 h-6 text-white/90" />
        <h2 className="text-4xl font-bold text-white text-center">
          {weather.city}
        </h2>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <div className="text-7xl font-bold text-white mb-2">
            {weather.temperature}°C
          </div>
          <div className="text-2xl text-white/90 capitalize">
            {weather.description}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20">
          <Cloud className="w-8 h-8 text-white/90 mx-auto mb-2" />
          <div className="text-sm text-white/80 mb-1">Condition</div>
          <div className="text-lg font-semibold text-white">{weather.condition}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20">
          <Droplets className="w-8 h-8 text-white/90 mx-auto mb-2" />
          <div className="text-sm text-white/80 mb-1">Humidity</div>
          <div className="text-lg font-semibold text-white">{weather.humidity}%</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20">
          <Wind className="w-8 h-8 text-white/90 mx-auto mb-2" />
          <div className="text-sm text-white/80 mb-1">Wind</div>
          <div className="text-lg font-semibold text-white">{weather.windSpeed} km/h</div>
        </div>
      </div>
    </div>
  );
}
