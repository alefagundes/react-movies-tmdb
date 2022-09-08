import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

//css
import './Movie.css'
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from 'react-icons/bs'
//components
import MovieCard from '../components/MovieCard'

//URL
const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Movie = () => {
  const [movie, setMovie] = useState(null)
  const { id } = useParams()

  const getMovieById = async (url) => {
    const req = await fetch(url)
    const res = await req.json()
    setMovie(res)
  }

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`
    getMovieById(movieURL)
  }, [id])

  const formatCurrency = (number) => {
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
  }

  return (
    <div className="movie-page">
      {!movie && <p>Carregando...</p>}
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Faturamento:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Movie
