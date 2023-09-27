import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Tab, Tabs, TextField, Button  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SingleContent from '../Components/SingleContent';
import CustomPage from '../Components/CustomPage';
import './CSS/Search.css';


const Search = () => {

  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme ({
    palette: {
      type: 'dark',
      primary: {
        main: '#FFF',
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=2ec38520d9cc1999ae063aa85e80e8b3&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      console.log(data);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();

    // eslint-disable-next-line
  }, [type, page]);
  

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField 
            style={{ flex: 1 }}
            className = 'searchBox'
            label = 'Search'
            variant = 'filled'
            onChange = {(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant = 'contained'
            style = {{ marginLeft: 10 }}
          >
            <SearchIcon fontSize='large' />
          </Button>
        </div>
        <Tabs
          value = {type}
          indicatorColor = 'primary'
          textColor = 'primary'
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style = {{ paddingBottom: 5 }}
          aria-label = 'disabled tabs example'
        >
          <Tab style={{ width: '50%', fontFamily: 'Raleway' }} label='Search Movies' />
          <Tab style={{ width: '50%', fontFamily: 'Raleway' }} label='Search TV Series' />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content && content.map((e) => (
          <SingleContent 
            key={e.id}
            id={e.id}
            poster={e.poster_path}
            title={e.title || e.name}
            date={e.first_air_date || e.release_date}
            media_type={ type ? "tv": "movie" }
            vote_average={e.vote_average}
          />
        ))}
        { searchText && !content && (type ? <h2>No series found</h2> : <h2>No movies found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPage setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search