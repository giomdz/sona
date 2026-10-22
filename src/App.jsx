import { useState } from 'react'
import { songs } from './data/songs'
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
          <article key={song.id}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <p>{song.genre} : {song.mood}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App