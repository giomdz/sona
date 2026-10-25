
function SongCard({
  song,
  featured,
  isFavorite,
  onToggleFavorite,
  isSaved,
  onToggleSaved
}) {
  return (
    <article>
      <h3>
        {song.title} {featured && '⭐ Featured'}
      </h3>

      <p>{song.artist}</p>
      <p>{song.genre} · {song.mood}</p>

      <button
        type="button"
        onClick={() => onToggleFavorite(song.id)}
      >
        {isFavorite ? '♥ Unlike' : '♡ Like'}
      </button>

      <button
        type="button"
        onClick={() => onToggleSaved(song.id)}
      >
        {isSaved ? '✓ Saved' : '+ Save to Library'}
      </button>
    </article>
  )
}

export default SongCard
