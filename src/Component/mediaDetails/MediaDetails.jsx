import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MediaDetails.css'
import LoadingPage from '../loadingpage/LoadingPage/LoadingPage';

const MediaDetails = () => {
       const key = "6d17329fff90ad267e3d45efcb1967e1";
       const [details, setDetails] = useState();
       const { id ,mediatype } = useParams();

       useEffect(() => {
              getMediaDetails();
       }, [id, mediatype]); 

       async function getMediaDetails() {
              try {
                     const { data } = await axios.get(`https://api.themoviedb.org/3/${mediatype}/${id}?api_key=${key}`);
                     setDetails(data);
              } catch (error) {
                     console.error(error);
              }
       }

       return (
              <>
                     {details ? <div className="container py-5">
                     <div className="row ">
                            <div className='col-12 col-md-6 col-lg-4 g'>
                                   <div>
                                          {details && details.poster_path && (
                                                 <div className='ImageDetails'>
                                                        <img className='w-100 ' src={`https://image.tmdb.org/t/p/original/${details.poster_path}`} alt={details.name || details.title} />

                                                 </div>
)}                                   
                                   </div>
                            </div>
                            <div className='col-lg-1'></div>
                            <div className='col-12 col-md-6 col-lg-7 text-white vstack gap-3'>
                                   <h1 className='fw-bold text-danger'>{details && (details.name || details.title)}</h1>
                                   {details && details.tagline?<h3 className='fw'>" {details && (details.tagline)} "</h3>:<></>}
                                   <p className='fs-4 lead'>{details&&(details.overview)}</p>
                                   <div className='hstack gap-3'>
                                          {details&&(details.genres.map((m,i)=>(<span className='btn btn-dark'>{m.name}</span>)))}
                                   </div>
                                   <h4><span className='text-warning'>Vote Average : </span>{details&&(details.vote_average)} </h4>
                                   <h4><span className='text-warning'>Vote Count : </span>{details&&(details.vote_count)} </h4>

                            </div>
                     </div>
                     </div>:<LoadingPage/>}
              </>
       );
};

export default MediaDetails;
