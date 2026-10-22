import { useState } from 'react'
import { songs } from './data/songs'
import SongCard from './components/SongCard'
import './App.css'

function App(){
  const [search, setSearch] = useState('')
  const filteredSongs = songs.filter((song) => 
  song.artist.toLowerCase().includes(search.toLowerCase()) ||
  song.title.toLowerCase().includes(search.toLowerCase())
)

  return (
    <main>
      <h1>SONA</h1>
      <p>Discover music that matches your mood!</p>


      <section>
        <h2>Discover Songs</h2>
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
          />
        ))}
      </section>
    </main>
  )
}

export default App