import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';
import Trending from './Pages/Trending';
import { Container } from '@mui/material';
import Header from './Components/Header';
import SimpleBottomNavigation from './Components/SimpleBottomNavigation';
 
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className='app'>
        <Container>
          <Routes>
            <Route path='/' element={<Trending/>} />
            <Route path='/movies' element={<Movies/>} />
            <Route path='/series' element={<Series/>} />
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
