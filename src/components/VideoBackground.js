import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'

const VideoBackground = ({ movieId }) => {

  const getMovieVideos = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
    const json = await data.json()
    const filterData = json?.results?.filter(item => item?.type === 'Trailer')
    const trailer = filterData?.length ? filterData?.[0] : json?.results?.[0]
    console.log(filterData, 'THIS US OIUYTR')
  }

  useEffect(() => {
    getMovieVideos()
  }, [])
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/C4oBXLr3zos?si=kqzrYlT7isJoC4-y"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  )
}

export default VideoBackground