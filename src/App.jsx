
import { useState, useEffect } from 'react'
import { songs } from './data/songs'
import SongCard from './components/SongCard'
import './App.css'

function App(){
  const [search, setSearch] = useState('')
  const [selectedMood, setSelectedMood] = useState('All')
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')

    return savedFavorites ? JSON.parse(savedFavorites) : []
  })
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])
  function toggleFavorite(songId) {
  setFavorites((currentFavorites) => {
    if (currentFavorites.includes(songId)) {
      return currentFavorites.filter((id) => id !== songId)
    }

    return [...currentFavorites, songId]
  })
}
  const filteredSongs = songs.filter((song) => {
  const matchesSearch =
    song.artist.toLowerCase().includes(search.toLowerCase()) ||
    song.title.toLowerCase().includes(search.toLowerCase())

  const matchesMood =
    selectedMood === 'All' || song.mood === selectedMood

  return matchesSearch && matchesMood
})

  return (
    <main>
      <h1>SONA</h1>
      <p>Discover music that matches your mood!</p>


      <section>
        <h2>Discover Songs</h2>
        <div>
  {['All', 'Upbeat', 'Chill', 'Dreamy'].map((mood) => (
    <button
      key={mood}
      onClick={() => setSelectedMood(mood)}
      style={{
        backgroundColor: selectedMood === mood ? 'purple' : 'lightgray',
        color: selectedMood === mood ? 'white' : 'black'
      }}
    >
      {mood}
    </button>
  ))}
</div>
        <input
          type="text"
          placeholder="Search by song or artist ..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          />
          {filteredSongs.length === 0 && (
            <p>No songs found. Try another artist. </p>
          )}
        {filteredSongs.map((song) => (
          <SongCard 
          key = {song.id} 
          song={song} 
          featured={song.id === 1}
          isFavorite={favorites.includes(song.id)}
          onToggleFavorite={toggleFavorite}
          />
        ))}
      </section>
    </main>
  )
}

export default App