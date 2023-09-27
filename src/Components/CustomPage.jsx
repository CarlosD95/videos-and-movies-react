import React from 'react';
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPage = ({ setPage, numOfPages = 10 }) => {

  function handleChange (page) {
    setPage(page);
    window.scroll(0,0);
  }


  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handleChange(e.target.textContent)}
          count={numOfPages}
          color='primary'
          showFirstButton 
          showLastButton
          variant="outlined"
        />
      </ThemeProvider>
    </div>
  );
}

export default CustomPage;