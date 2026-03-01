// Geolocation utility for country-based content filtering
// Supports: France (FR), United Kingdom (UK), Germany (DE)

const SUPPORTED_COUNTRIES = {
  FR: { name: "France", flag: "🇫🇷", code: "fr" },
  UK: { name: "United Kingdom", flag: "🇬🇧", code: "gb" },
  DE: { name: "Germany", flag: "🇩🇪", code: "de" },
};

const STORAGE_KEY = "selectedCountry";
const DEFAULT_COUNTRY = "FR";

/**
 * Get the currently selected country
 * @returns {string} Country code (FR, UK, DE)
 */
export function getSelectedCountry() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_COUNTRIES[stored]) {
    return stored;
  }
  return DEFAULT_COUNTRY;
}

/**
 * Set the selected country
 * @param {string} countryCode - Country code (FR, UK, DE)
 */
export function setSelectedCountry(countryCode) {
  if (SUPPORTED_COUNTRIES[countryCode]) {
    localStorage.setItem(STORAGE_KEY, countryCode);
    return true;
  }
  return false;
}

/**
 * Get all supported countries
 * @returns {Object} Countries configuration
 */
export function getSupportedCountries() {
  return SUPPORTED_COUNTRIES;
}

/**
 * Get country info
 * @param {string} countryCode - Country code (FR, UK, DE)
 * @returns {Object} Country info
 */
export function getCountryInfo(countryCode) {
  return SUPPORTED_COUNTRIES[countryCode] || SUPPORTED_COUNTRIES[DEFAULT_COUNTRY];
}

/**
 * Get playlist URL for a country and type
 * @param {string} countryCode - Country code (FR, UK, DE)
 * @param {string} type - Playlist type (home, iptv, radio)
 * @returns {string} Playlist URL
 */
export function getPlaylistUrl(countryCode, type) {
  const country = SUPPORTED_COUNTRIES[countryCode] || SUPPORTED_COUNTRIES[DEFAULT_COUNTRY];
  const code = country.code;

  const playlists = {
    home: `https://iptv-org.github.io/iptv/countries/${code}.m3u`,
    iptv: "https://iptv-org.github.io/iptv/index.m3u",
    radio: `https://iptv-org.github.io/iptv/countries/${code}.m3u`, // Radio content filtered from country playlist
  };

  return playlists[type] || playlists.home;
}
