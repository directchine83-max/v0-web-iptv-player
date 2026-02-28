const BASE = "https://iptv-org.github.io/iptv";

export const categories = [
  { id: "general",       icon: "\uD83D\uDCFA", en: "General",       fr: "G\u00e9n\u00e9ral" },
  { id: "movies",        icon: "\uD83C\uDFAC", en: "Movies",        fr: "Films" },
  { id: "series",        icon: "\uD83D\uDCFC", en: "Series",        fr: "S\u00e9ries" },
  { id: "sports",        icon: "\u26BD",       en: "Sports",        fr: "Sports" },
  { id: "news",          icon: "\uD83D\uDCF0", en: "News",          fr: "Actualit\u00e9s" },
  { id: "music",         icon: "\uD83C\uDFB5", en: "Music",         fr: "Musique" },
  { id: "entertainment", icon: "\uD83C\uDF89", en: "Entertainment", fr: "Divertissement" },
  { id: "kids",          icon: "\uD83E\uDDF8", en: "Kids",          fr: "Enfants" },
  { id: "documentary",   icon: "\uD83C\uDF0D", en: "Documentary",   fr: "Documentaire" },
  { id: "animation",     icon: "\uD83C\uDFA8", en: "Animation",     fr: "Animation" },
  { id: "comedy",        icon: "\uD83D\uDE02", en: "Comedy",        fr: "Com\u00e9die" },
  { id: "education",     icon: "\uD83C\uDF93", en: "Education",     fr: "\u00c9ducation" },
  { id: "cooking",       icon: "\uD83C\uDF73", en: "Cooking",       fr: "Cuisine" },
  { id: "lifestyle",     icon: "\uD83C\uDF3F", en: "Lifestyle",     fr: "Art de vivre" },
  { id: "culture",       icon: "\uD83C\uDFDB\uFE0F", en: "Culture", fr: "Culture" },
  { id: "religious",     icon: "\uD83D\uDD4A\uFE0F", en: "Religious", fr: "Religieux" },
];

export const languages = [
  { code: "eng", icon: "\uD83C\uDDEC\uD83C\uDDE7", en: "English",    fr: "Anglais" },
  { code: "fra", icon: "\uD83C\uDDEB\uD83C\uDDF7", en: "French",     fr: "Fran\u00e7ais" },
  { code: "spa", icon: "\uD83C\uDDEA\uD83C\uDDF8", en: "Spanish",    fr: "Espagnol" },
  { code: "deu", icon: "\uD83C\uDDE9\uD83C\uDDEA", en: "German",     fr: "Allemand" },
  { code: "por", icon: "\uD83C\uDDE7\uD83C\uDDF7", en: "Portuguese", fr: "Portugais" },
  { code: "ara", icon: "\uD83C\uDDF8\uD83C\uDDE6", en: "Arabic",     fr: "Arabe" },
  { code: "zho", icon: "\uD83C\uDDE8\uD83C\uDDF3", en: "Chinese",    fr: "Chinois" },
  { code: "rus", icon: "\uD83C\uDDF7\uD83C\uDDFA", en: "Russian",    fr: "Russe" },
  { code: "ita", icon: "\uD83C\uDDEE\uD83C\uDDF9", en: "Italian",    fr: "Italien" },
  { code: "nld", icon: "\uD83C\uDDF3\uD83C\uDDF1", en: "Dutch",      fr: "N\u00e9erlandais" },
  { code: "tur", icon: "\uD83C\uDDF9\uD83C\uDDF7", en: "Turkish",    fr: "Turc" },
  { code: "jpn", icon: "\uD83C\uDDEF\uD83C\uDDF5", en: "Japanese",   fr: "Japonais" },
  { code: "kor", icon: "\uD83C\uDDF0\uD83C\uDDF7", en: "Korean",     fr: "Cor\u00e9en" },
  { code: "hin", icon: "\uD83C\uDDEE\uD83C\uDDF3", en: "Hindi",      fr: "Hindi" },
  { code: "pol", icon: "\uD83C\uDDF5\uD83C\uDDF1", en: "Polish",     fr: "Polonais" },
];

export function categoryUrl(id) {
  return `${BASE}/categories/${id}.m3u`;
}

export function languageUrl(code) {
  return `${BASE}/languages/${code}.m3u`;
}

export function getLabel(item, locale) {
  return locale === "fr" ? item.fr : item.en;
}
