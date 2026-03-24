import { useState, useEffect } from 'react';
import { CloudRain, AlertCircle, Loader2 } from 'lucide-react';
import { WeatherBackground } from './components/WeatherBackground';
import { SearchInput } from './components/SearchInput';
import { WeatherDisplay } from './components/WeatherDisplay';
import { RecentSearches } from './components/RecentSearches';
import { getWeatherByCity, WeatherData } from './services/weather';
import { getRecentSearches, addRecentSearch, clearRecentSearches } from './utils/recentSearches';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      addRecentSearch(data.city);
      setRecentSearches(getRecentSearches());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground condition={weather?.condition || 'default'} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 gap-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudRain className="w-12 h-12 text-white drop-shadow-lg" />
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              WeatherWise
            </h1>
          </div>
          <p className="text-xl text-white/90 drop-shadow-md">
            Your intelligent weather companion
          </p>
        </div>

        <SearchInput onSearch={handleSearch} isLoading={loading} />

        {loading && (
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl border border-white/30">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
            <span className="text-white text-lg">Fetching weather data...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-500/20 backdrop-blur-lg px-6 py-4 rounded-2xl border border-red-300/30 max-w-md">
            <AlertCircle className="w-6 h-6 text-white flex-shrink-0" />
            <span className="text-white">{error}</span>
          </div>
        )}

        {weather && !loading && <WeatherDisplay weather={weather} />}

        {!loading && !weather && recentSearches.length > 0 && (
          <RecentSearches
            searches={recentSearches}
            onSelect={handleSearch}
            onClear={handleClearSearches}
          />
        )}
      </div>
    </div>
  );
}

export default App;
