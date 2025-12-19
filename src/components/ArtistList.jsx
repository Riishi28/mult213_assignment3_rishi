function ArtistList({ artists, onSelectArtist }) {
  if (artists.length === 0) {
    return <p>No artists found.</p>;
  }

  return (
    <ul className="artist-list">
      {artists.map((artist) => (
        <li
          key={artist.id}
          className="artist-card"
          onClick={() => onSelectArtist(artist)}
        >
          {artist.cover_image && (
            <img
              src={artist.cover_image}
              alt={artist.title}
              width="120"
            />
          )}
          <p>{artist.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default ArtistList;
