import React, { useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';

const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, type, setPage, }) => {

  const handleAdd = (genre) => {

    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((e) => e.id !== genre.id));
    setPage(1);

  }

  const handleRemove = (genre) => {

    setSelectedGenres(selectedGenres.filter((e) => e.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);

  };

  const fetchGenres = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=2ec38520d9cc1999ae063aa85e80e8b3&language=en-US`);
    setGenres(data.genres);
  }

  useEffect(() => {
    fetchGenres();  
  
    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);
  

  return (
    <div style ={{ padding: '6px 0' }}>
      {selectedGenres.map((genre) => (
        <Chip 
          style = {{ margin: 2 }}
          label = {genre.name}
          key = {genre.id}
          color = 'primary'
          clickable
          size = "small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {[genres].map((genre) => (
        <Chip 
          style = {{ margin: 2 }}
          label = {genre.name}
          key = {genre.id}
          clickable
          size = "small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres