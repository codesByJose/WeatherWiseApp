import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && !isLoading) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          disabled={isLoading}
          className="w-full px-6 py-4 pr-14 text-lg bg-white/20 backdrop-blur-lg border-2 border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition-all duration-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !city.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/30 hover:bg-white/40 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
          aria-label="Search weather"
        >
          <Search className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
}
