import React from 'react'
import Slider from "react-slick";
import './SliderTrending.css'
import { Link } from 'react-router-dom';

const SliderTrending = ({trending,slideToShow,showLayer,type}) => {
       const settings = {
              dots: true,
              infinite: true,
              slidesToShow: slideToShow,
              slidesToScroll: 3,
              autoplay: true,
              speed: 8000,
              autoplaySpeed: 1,
              cssEase: "linear",
       };
       return (
       <>
              <div>
                     <Slider {...settings}>
                     {trending.map((movie, index) => (

                                   <Link to={`/details/${movie.id}/${movie.media_type||type}`}>
                                          <div key={index} className='movieCard rounded-5 overflow-hidden p-4 position-relative btn-warning text-uppercase'>
                                          <div className='overflow-hidden position-relative'>
                                                 <img className='w-100 rounded-5' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.name || movie.title} />
                                                 {showLayer?<div className='layerInfo d-flex flex-column justify-content-center align-items-center  rounded-5 '>
                                                        <h4 className='text-white '>{movie.name || movie.title}</h4>
                                                        <div className='d-flex row row-cols-3 w-100 '>
                                                               <div className='text-white'><i class="fa-regular fa-star"></i><span>{movie.vote_average}</span></div>
                                                               <div>
                                                                      <div className={movie.media_type=="tv"?"btn btn-warning":"btn btn-danger"}>{movie.media_type}</div>

                                                               </div>
                                                               <div className='text-white'>{movie.release_date||movie.first_air_date}</div>
                                                        </div>
                                                 </div>:<></>}
                                          </div>
                                          <div className='bg-black bg-opacity-10  top-0 bottom-0 end-0 start-0 position-absolute'></div>
                                   </div>
                                   </Link>
                                   
                     ))}
                     </Slider>
              </div>
       </>
       )
}

export default SliderTrending