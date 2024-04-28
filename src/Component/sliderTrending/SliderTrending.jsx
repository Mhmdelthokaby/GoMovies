import React from 'react';
import Slider from "react-slick";
import './SliderTrending.css';
import { Link } from 'react-router-dom';

const SliderTrending = ({ trending, showLayer, type ,slideToShow }) => {


       const settings = {
              dots: true,
              infinite: true,
              slidesToShow: calculateSlidesToShow(slideToShow),
              slidesToScroll: 3,
              autoplay: true,
              speed: 8000,
              autoplaySpeed: 1,
              cssEase: "linear",
              responsive: [
                     {
                            breakpoint: 1024,
                            settings: {
                                   slidesToShow: 3,
                            }
                     },
                     {
                            breakpoint: 768,
                            settings: {
                                   slidesToShow: 2,
                            }
                     },
                     {
                            breakpoint: 480,
                            settings: {
                                   slidesToShow: 1,
                            }
                     }
              ]
       };

       function calculateSlidesToShow(num) {
              const windowWidth = window.innerWidth;
              if (windowWidth >= 1024) {
                     return num;
              } else if (windowWidth >= 768) {
                     return 2;
              } else {
                     return 1;
              }
       }

       

       return (
              <div className='container-fluid'>
                     <Slider {...settings}>
                            {trending.map((movie, index) => (
                                   <div key={index} className=''>
                                          <Link to={`/details/${movie.id}/${movie.media_type || type}`}>
                                                 <div className='movieCard rounded-5 overflow-hidden p-4 position-relative btn-warning text-uppercase'>
                                                        <div className='overflow-hidden position-relative'>
                                                               <img className='w-100 rounded-5' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.name || movie.title} />
                                                               {showLayer ? (
                                                                      <div className='layerInfo d-flex flex-column justify-content-center align-items-center rounded-5'>
                                                                             <h4 className='text-white'>{movie.name || movie.title}</h4>
                                                                             <div className='d-flex row row-cols-3 w-100'>
                                                                                    <div className='text-white'><i className="far fa-star"></i><span>{movie.vote_average}</span></div>
                                                                                    <div>
                                                                                           <div className={movie.media_type === "tv" ? "btn btn-warning" : "btn btn-danger"}>{movie.media_type}</div>
                                                                                    </div>
                                                                                    <div className='text-white'>{movie.release_date || movie.first_air_date}</div>
                                                                             </div>
                                                                      </div>
                                                               ) : null}
                                                        </div>
                                                        <div className='bg-black bg-opacity-10  top-0 bottom-0 end-0 start-0 position-absolute'></div>
                                                 </div>
                                          </Link>
                                   </div>
                            ))}
                     </Slider>
              </div>
       );
}

export default SliderTrending;
