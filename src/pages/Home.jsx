import React from 'react'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
//css
import '../pages/MovieGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getMovie = async (url) => {
    const req = await fetch(url)
    const res = await req.json()
    setTopMovies(res.results)
    console.log(topMovies)
  }

  useEffect(() => {
    const topRateUrl = `${moviesURL}top_rated?${apiKey}`
    getMovie(topRateUrl)
  }, [])

  return (
    <div className="container">
      <h2 className="title">MELHORES FILMES:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((t) => <MovieCard key={t.id} movie={t} />)}
      </div>
    </div>
  )
}
export default Home
