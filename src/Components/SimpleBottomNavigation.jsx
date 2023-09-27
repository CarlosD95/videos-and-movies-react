import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 100,
  }
});

export default function SimpleBottomNavigation() {
  
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (value === 0){
      navigate('/');
    } else if (value === 1){
      navigate("/movies");
    } else if (value === 2){
      navigate('/series'); 
    } else if (value === 3){
      navigate('/search');
    }
  }, [value, navigate])

  return (
    <BottomNavigation
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
      style={{backgroundColor: '#2d313a'}}
    >
      <BottomNavigationAction 
        style={{color: 'white'}}
        label='Trending'
        icon={<WhatshotIcon/>}      
      />
      <BottomNavigationAction 
        style={{color: 'white'}}
        label='Movies'
        icon={<MovieIcon/>}      
      />
      <BottomNavigationAction 
        style={{color: 'white'}}
        label='TV Series'
        icon={<TvIcon/>}      
      />
      <BottomNavigationAction 
        style={{color: 'white'}}
        label='Search'
        icon={<SearchIcon/>}      
      />
    </BottomNavigation>
  )
}
