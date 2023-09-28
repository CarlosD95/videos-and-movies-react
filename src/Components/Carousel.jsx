import React, { useState, useEffect } from 'react';
import axios from 'axios'
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from '../config.js';
import './CSS/Carousel.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {

    const [credits, setCredits] = useState([]);

    const items = credits.map((e) => (
      <div style={{fontSize: '12px'}} className="carouselItem">
        <img
          src={e.profile_path ? `${img_300}/${e.profile_path}` : noPicture}
          alt={e?.name}
          onDragStart={handleDragStart}
          className="carouselItem-img"
        />
        <b className='carouselItem-txt'>{e?.name}</b>
      </div>
    ));
    

    const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 3,
      },
      1024: {
        items: 5,
      },
    };

    const fetchCredits = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=2ec38520d9cc1999ae063aa85e80e8b3&language=en-US`
      );
      setCredits(data.cast);
    };

    useEffect(() => {
      fetchCredits();
      // eslint-disable-next-line
    }, [])

  return (
    <AliceCarousel 
      mouseTracking
      responsive = {responsive}
      items = {items}
      autoPlay
    />
  );
}

export default Carousel