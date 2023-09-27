import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useGenre from '../Hooks/useGenre';
import Genres from '../Components/Genres';
import CustomPage from '../Components/CustomPage';
import SingleContent from '../Components/SingleContent';

const Series = () => {

  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=2ec38520d9cc1999ae063aa85e80e8b3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchSeries();
  
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover TV Series 🎥</span>
      <Genres 
        type = 'tv'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content && content.map((e) => (
          <SingleContent 
            key={e.id}
            id={e.id}
            poster={e.poster_path}
            title={e.title || e.name}
            date={e.first_air_date || e.release_date}
            media_type="tv"
            vote_average={e.vote_average}
          />
        ))}
      </div>
      {numOfPages > 1 && (
        <CustomPage setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Series