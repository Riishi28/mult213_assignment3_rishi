const BASE_URL = "https://api.discogs.com";

/**
 * Search artists from Discogs API
 * @param {string} query - The search term for the artist
 * @returns {Array} - Array of artist objects
 */
export async function searchArtists(query) {
  const response = await fetch(
    `${BASE_URL}/database/search?q=${query}&type=artist&token=${import.meta.env.VITE_DISCOGS_TOKEN}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch artists");
  }

  const data = await response.json();
  return data.results;
}

/**
 * Get releases for a specific artist
 * @param {number} artistId - The Discogs artist ID
 * @returns {Array} - Array of release objects
 */
export async function getArtistReleases(artistId) {
  const response = await fetch(
    `${BASE_URL}/artists/${artistId}/releases?token=${import.meta.env.VITE_DISCOGS_TOKEN}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch releases");
  }

  const data = await response.json();
  return data.releases;
}
