import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice'
import { API_OPTIONS } from '../utils/constants'

const useMoviesTrailer = (movieId) => {
  const dispatch = useDispatch()
  const getMovieVideos = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
    const json = await data.json()
    const filterData = json?.results?.filter(item => item?.type === 'Trailer')
    const trailer = filterData?.length ? filterData?.[0] : json?.results?.[0]
    dispatch(addTrailerVideo(trailer))
  }

  useEffect(() => {
    getMovieVideos()
  }, [])

}

export default useMoviesTrailer