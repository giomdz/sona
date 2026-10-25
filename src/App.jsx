import { useState, useEffect } from 'react'
import { songs } from './data/songs'
import SongCard from './components/SongCard'
import './App.css'

function App() {
  // Search and filter state
  const [search, setSearch] = useState('')
  const [selectedMood, setSelectedMood] = useState('All')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  // Which page is visible: Discover or Library
  const [activeView, setActiveView] = useState('discover')

  // Load saved favorites when the app starts
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  const [savedSongs, setSavedSongs] = useState(() => {
    const storedSongs = localStorage.getItem('savedSongs')
    return storedSongs ? JSON.parse(storedSongs) : []
  })

  // creating playlists
  const [playlists, setPlaylists] = useState(() => {
    try {
      const stored = localStorage.getItem('playlists')
      const parsed = stored ? JSON.parse(stored) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const [playlistName, setPlaylistName] = useState('')
  const [selectedSongIds, setSelectedSongIds] = useState([])
  const [playlistError, setPlaylistError] = useState('')

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('savedSongs', JSON.stringify(savedSongs))
  }, [savedSongs])

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists))
  }, [playlists])

  // Add or remove a song from favorites
  function toggleFavorite(songId) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(songId)) {
        return currentFavorites.filter((id) => id !== songId)
      }

      return [...currentFavorites, songId]
    })
  }

  function toggleSaved(songId) {
  setSavedSongs((currentSaved) => {
    if (currentSaved.includes(songId)) {
      return currentSaved.filter((id) => id !== songId)
    }

    return [...currentSaved, songId]
  })
}

function togglePlaylistSong(songId) {
  setSelectedSongIds((current) => {
    if (current.includes(songId)) {
      return current.filter((id) => id !== songId)
    }

    return [...current, songId]
  }) 
}

function handleCreatePlaylist(event) {
  event.preventDefault()

  console.log('FORM SUBMITTED', {
    playlistName,
    selectedSongIds
  })

  const cleanName = playlistName.trim()

  if (cleanName === '') {
    setPlaylistError('Please enter a playlist name.')
    return
  }

  if (selectedSongIds.length === 0) {
    setPlaylistError('Please select atleast one song.')
    return
  }

  const newPlaylist = {
    id: crypto.randomUUID(),
    name: cleanName,
    songIds: selectedSongIds
  }

  setPlaylists((current) => [...current, newPlaylist])

  setPlaylistName('')
  setSelectedSongIds([])
  setPlaylistError('')
}

  // Songs displayed in Discover
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.artist.toLowerCase().includes(search.toLowerCase()) ||
      song.title.toLowerCase().includes(search.toLowerCase())

    const matchesMood =
      selectedMood === 'All' || song.mood === selectedMood

    const matchesGenre =
      selectedGenre === 'All' || song.genre === selectedGenre

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(song.id)

    return (
      matchesSearch &&
      matchesMood &&
      matchesGenre &&
      matchesFavorites
    )
  })

  // Songs displayed in My Library
  const librarySongs = songs.filter((song) =>
    savedSongs.includes(song.id)
  )

  return (
   <main> 
      <h1>SONA</h1>
      <p>Discover music that matches your mood!</p>

      {/* Navigation */}
      <nav aria-label="Main navigation">
        <button
          type="button"
          onClick={() => setActiveView('discover')}
          aria-pressed={activeView === 'discover'}
        >
          Discover
        </button>

        <button
          type="button"
          onClick={() => setActiveView('library')}
          aria-pressed={activeView === 'library'}
        >
          My Library ({librarySongs.length})
        </button>
      </nav>

      {/* Discover view */}
      {activeView === 'discover' ? (
        <section>
          <h2>Discover Songs</h2>

          <div>
            <p>Filter by mood</p>

            {['All', 'Upbeat', 'Chill', 'Dreamy'].map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                aria-pressed={selectedMood === mood}
                style={{
                  backgroundColor:
                    selectedMood === mood ? 'purple' : 'lightgray',
                  color: selectedMood === mood ? 'white' : 'black'
                }}
              >
                {mood}
              </button>
            ))}
          </div>

          <div>
            <p>Filter by genre</p>

            {['All', 'Pop', 'R&B'].map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                aria-pressed={selectedGenre === genre}
              >
                {genre}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            aria-pressed={showFavoritesOnly}
          >
            {showFavoritesOnly
              ? '♥ Show All Songs'
              : '♡ My Favorites'}
          </button>

          <input
            type="text"
            placeholder="Search by song or artist..."
            aria-label="Search songs"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {filteredSongs.length === 0 && (
            <p>No songs found. Try changing your filters.</p>
          )}

          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              featured={song.id === 1}
              isFavorite={favorites.includes(song.id)}
              onToggleFavorite={toggleFavorite}
              isSaved={savedSongs.includes(song.id)}
              onToggleSaved={toggleSaved}
            />
          ))}
        </section>
      ) : (
        /* Library view */
        <section>
          <h2>My Library</h2>
          <p>Your saved songs, all in one place.</p>


<form onSubmit={handleCreatePlaylist}>
  <h3>Create Playlist</h3>

  <label htmlFor="playlist-name">Playlist name</label>
  <input
    id="playlist-name"
    type="text"
    placeholder="e.g. Late Night Drives"
    value={playlistName}
    onChange={(event) => setPlaylistName(event.target.value)}
  />

  <fieldset>
    <legend>Choose songs</legend>

    {songs.map((song) => (
      <label key={song.id}>
        <input
          type="checkbox"
          checked={selectedSongIds.includes(song.id)}
          onChange={() => togglePlaylistSong(song.id)}
        />
        {song.title} — {song.artist}
      </label>
    ))}
  </fieldset>

  {playlistError && (
    <p role="alert">{playlistError}</p>
  )}

  <button type="submit">Create Playlist</button>
</form>


<section>
  <h3>My Playlists ({playlists.length})</h3>

  {playlists.length === 0 ? (
    <p>No playlists yet. Create your first one!</p>
  ) : (
    playlists.map((playlist) => (
      <article key={playlist.id}>
        <h4>{playlist.name}</h4>
        <p>{playlist.songIds.length} songs</p>

        <ul>
          {playlist.songIds.map((songId) => {
            const song = songs.find((item) => item.id === songId)

            return song ? (
              <li key={songId}>
                {song.title} — {song.artist}
              </li>
            ) : null
          })}
        </ul>
      </article>
    ))
  )}
</section>



          {librarySongs.length === 0 ? (
            <p>
              No saved songs yet. Visit Discover to save some songs!
            </p>
          ) : (
            librarySongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                featured={song.id === 1}
                isFavorite={favorites.includes(song.id)}
                onToggleFavorite={toggleFavorite}
                isSaved={savedSongs.includes(song.id)}
                onToggleSaved={toggleSaved}
              />
            ))
          )}
        </section>
      )}
    </main>
  )
}

export default App
