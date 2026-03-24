const STORAGE_KEY = 'weatherwise_recent_searches';
const MAX_SEARCHES = 8;

export function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(city: string): void {
  try {
    const searches = getRecentSearches();
    const filtered = searches.filter(s => s.toLowerCase() !== city.toLowerCase());
    const updated = [city, ...filtered].slice(0, MAX_SEARCHES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save recent search:', error);
  }
}

export function clearRecentSearches(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear recent searches:', error);
  }
}
