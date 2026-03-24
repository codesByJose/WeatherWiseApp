import { Clock, X } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 w-full max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-white" />
          <h3 className="text-xl font-bold text-white uppercase tracking-wide">Recent Locations</h3>
        </div>
        <button
          onClick={onClear}
          className="text-white/90 hover:text-white transition-colors px-3 py-1.5 hover:bg-white/20 rounded-lg border border-white/30"
          aria-label="Clear all recent locations"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {searches.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className="group text-left p-5 bg-white/15 border border-white/20 rounded-2xl backdrop-blur-md hover:bg-white/30 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-2xl"
          >
            <div className="text-2xl font-bold text-white group-hover:text-white">{city}</div>
            <div className="mt-1 text-sm text-white/70">Tap to view weather</div>
          </button>
        ))}
      </div>
    </div>
  );
}
