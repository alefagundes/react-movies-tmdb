import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
//css
import './MovieGrid.css'
//urls
const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const query = searchParams.get('q')

  const getSearchMovie = async (url) => {
    const req = await fetch(url)
    const res = await req.json()
    setMovies(res.results)
  }

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`
    console.log(searchWithQueryURL)
    getSearchMovie(searchWithQueryURL)
  }, [query])

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span>{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((t) => <MovieCard key={t.id} movie={t} />)}
      </div>
    </div>
  )
}

export default Search
