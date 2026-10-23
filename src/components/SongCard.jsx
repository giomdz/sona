function SongCard({ song, featured, isFavorite, onToggleFavorite }) {
    return (
        <article>
            <h3>
                {song.title} {featured && '⭐ Featured' }
            </h3>

            <p>{song.artist}</p>
            <p>{song.genre} .  {song.mood}</p>

            <button onClick={() => onToggleFavorite(song.id)}>
                {isFavorite ? 'Remove favorite' : 'Add to favorites'}
            </button>
        </article>
    )
}

export default SongCard