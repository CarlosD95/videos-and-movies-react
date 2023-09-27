import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPage from '../Components/CustomPage';
import SingleContent from '../Components/SingleContent';
import './CSS/Trending.css';

function Trending() {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=2ec38520d9cc1999ae063aa85e80e8b3&page=${page}`
    );

    setContent(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();

    // eslint-disable-next-line
  }, [page]);


  return (
    <div>
      <span className='pageTitle'>Trending today 🎬</span>
      <div className="trending">
        {content && content.map((e) => (
          <SingleContent
            key={e.id}
            id={e.id}
            poster={e.poster_path}
            title={e.title || e.name}
            date={e.first_air_date || e.release_date}
            media_type={e.media_type}
            vote_average={e.vote_average} />
        ))}
      </div>
      <CustomPage setPage={setPage} />
    </div>
  );
}

export default Trending;