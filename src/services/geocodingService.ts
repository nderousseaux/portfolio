/**
 * Service de geocoding pour obtenir les coordonnées GPS à partir d'un nom de ville
 * Utilise l'API Nominatim (OpenStreetMap) - gratuite et sans clé API
 */

interface GeocodingResult {
  lat: number;
  lng: number;
}

// Cache pour éviter les appels répétés à l'API
const geocodeCache = new Map<string, GeocodingResult>();

export async function geocodeCity(cityName: string): Promise<GeocodingResult> {
  // Vérifier le cache
  if (geocodeCache.has(cityName)) {
    return geocodeCache.get(cityName)!;
  }

  try {
    const encodedCity = encodeURIComponent(cityName);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodedCity}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'Portfolio-Website/1.0',
        },
        next: { revalidate: 86400 }, // Cache pendant 24h
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error(`No results found for: ${cityName}`);
    }

    const result: GeocodingResult = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };

    // Mettre en cache
    geocodeCache.set(cityName, result);
    
    return result;
  } catch (error) {
    console.error('Geocoding error:', error);
    // Fallback vers des coordonnées par défaut (Paris)
    return { lat: 48.8566, lng: 2.3522 };
  }
}
