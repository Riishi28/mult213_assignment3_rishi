function ReleaseList({ releases }) {
  if (!releases || releases.length === 0) {
    return <p>No releases found.</p>;
  }

  return (
    <div className="release-list">
      <h2>Releases</h2>

      <ul>
        {releases.map((release) => (
          <li key={release.id} className="release-card">
            {release.thumb && (
              <img
                src={release.thumb}
                alt={release.title}
                width="100"
              />
            )}
            <div>
              <p><strong>{release.title}</strong></p>
              <p>{release.year || "Year unknown"}</p>
              <p>{release.type}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReleaseList;
