import { useState } from "react";
import { searchArtists, getArtistDetails } from "./services/discogsapi";

function App() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState("");

  // Handle search
  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setFirstLoad(false);
    setSelectedArtist(null);

    try {
      const results = await searchArtists(query);
      setArtists(results);
      if (results.length === 0) setError("No artist found.");
    } catch {
      setError("Error fetching data.");
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle artist details
  const handleDetails = async (id) => {
    setLoading(true);
    try {
      const details = await getArtistDetails(id);
      setSelectedArtist(details);
    } catch {
      setError("Unable to load details.");
    } finally {
      setLoading(false);
    }
  };

  // Back to results
  const handleBack = () => setSelectedArtist(null);

  return (
    <div className="app">
      <div className={firstLoad ? "centered-view" : ""}>
        <h1>Music Explorer</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search artist or album"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {firstLoad && <p>Type an artist name to search!</p>}

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* Artist List */}
        {!selectedArtist && artists.length > 0 && (
          <ul className="artist-list">
            {artists.map((artist) => (
              <li
                className="artist-card"
                key={artist.id}
                onClick={() => handleDetails(artist.id)}
              >
                <img src={artist.thumb || ""} alt={artist.title} />
                <p>{artist.title}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Artist Details */}
        {selectedArtist && (
          <div className="release-section">
            <h2>{selectedArtist.name}</h2>
            <button id="backBtn" onClick={handleBack}>
              Back to results
            </button>

            <div className="release-list">
              {selectedArtist.releases?.length > 0 ? (
                <ul>
                  {selectedArtist.releases.map((release) => (
                    <li className="release-card" key={release.id}>
                      <img src={release.thumb || ""} alt={release.title} />
                      <p>{release.title}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="error">No releases found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
