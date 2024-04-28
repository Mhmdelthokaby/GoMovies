import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import SliderTrending from '../sliderTrending/SliderTrending';
import LoadingPage from './../loadingpage/LoadingPage/LoadingPage';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popularMovie,setPopularMovie] =useState([]);
  const key = "6d17329fff90ad267e3d45efcb1967e1";

  async function getTrendingMovies() {
    try {
      let { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`);
      setTrending(data.results);
    } catch (error) {
      console.error(error);
    }
  }
  async function getPopularMoview( ){
    try{
      let {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}`)
      setPopularMovie(data.results);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getTrendingMovies();
    getPopularMoview();
  }, []);

  

  return (
    <>
      {trending.length>0 &&popularMovie.length >0 ?<div className="container-fluid vstack gap-5">
        <div className='vstack gap-3'>
          <h2 className='text-white fw-bold text-uppercase text-center'><span><i class="fa-solid fa-bolt text-warning fs-1"></i></span> Trending Now</h2>
          <SliderTrending trending={trending} slideToShow={3} showLayer={true} />
        </div>
        <div className='vstack gap-3 overflow-hidden'>
          <h2 className='text-white fw-bold text-uppercase text-center'><span><i class="fa-solid fa-film text-warning fs-1"></i></span> TOP POPULAR movies</h2>
          <SliderTrending trending={popularMovie} slideToShow={5} showLayer={false} type={"movie"} />
        </div>
      </div>:<LoadingPage/>}
      
    </>
  );
};

export default Home;
