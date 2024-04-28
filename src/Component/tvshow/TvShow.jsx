import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from '../loadingpage/LoadingPage/LoadingPage';

const TvShow = () => {

  const [tvs, setTvs] = useState([]);
  const [pageNum, setPageNum] = useState(1); // Corrected typo in state variable name
  const key = "6d17329fff90ad267e3d45efcb1967e1";
  const nums = new Array(10).fill(1).map((e, i) => i + 1);

  async function getTvs(page) {
    setTvs([])
    try {
      let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
      setTvs(data.results);
      setPageNum(data.page);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTvs(1);
  }, []);

  return (
    <>
      {tvs.length>0 ?
        <div className="container-fluid py-5 vstack gap-5">
        <h2 className='text-white fw-bold text-uppercase text-center'><span><i className="fa-solid fa-fire-flame-curved text-warning"></i></span> TOP POPULAR TVS</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 overflow-hidden">
          {tvs.map((movie) => (
            <Link to={`/details/${movie.id}/tv`} key={movie.id}>
              <div className='position-relative overflow-hidden'>
                <img className="rounded-4 w-100" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} />
                <div className='position-absolute top-0 end-0 m-1'>
                  <span className='text-white bg-danger p-2 rounded-1'>{movie.vote_average}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <nav>
          <ul className='pagination pagination-sm d-flex justify-content-center hstack gap-2'>
            {nums.map((page) => (
              <li className='page-item text-white p-2' key={page} onClick={() => getTvs(page)}>
                <Link className='page-link text-white bg-transparent border-0  fs-4 '><span className={pageNum === page ? "border-bottom border-danger px-2 py-1" : ""}>{page}</span></Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
            : <LoadingPage/>
    }
    </>
  )
}

export default TvShow;
