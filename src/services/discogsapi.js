// src/services/discogsapi.js
const DISCOGS_TOKEN = "rZKdpaeMktFVnVPRTnPXyGXhCofsukRDTlnIvRid";

// Search artists
export const searchArtists = async (query) => {
  const res = await fetch(
    `https://api.discogs.com/database/search?q=${query}&token=${DISCOGS_TOKEN}`
  );
  const data = await res.json();
  return data.results || [];
};

// Get artist details with releases
export const getArtistDetails = async (artistId) => {
  const res = await fetch(
    `https://api.discogs.com/artists/${artistId}?token=${DISCOGS_TOKEN}`
  );
  const artistData = await res.json();

  const releasesRes = await fetch(
    `https://api.discogs.com/artists/${artistId}/releases?token=${DISCOGS_TOKEN}`
  );
  const releasesData = await releasesRes.json();

  return {
    ...artistData,
    releases: releasesData.releases || [],
  };
};
