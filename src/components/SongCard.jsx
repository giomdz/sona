function SongCard({ song, featured }) {
    return (
        <article>
            <h3>
                {song.title} {featured && '⭐ Featured' }
            </h3>
            <p>{song.artist}</p>
            <p>{song.genre} .  {song.mood}</p>
        </article>
    )
}

export default SongCard