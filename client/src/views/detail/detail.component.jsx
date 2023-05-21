import './detail.styles.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById } from '../../redux/actions';
import { useParams } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch()
  const videogameById = useSelector((state)=>state.videogameById);
  const { id } = useParams();

  useEffect(()=>{
    dispatch(getVideogameById(id))
  },[dispatch])
  
  return (
    <div >
      <h2>{videogameById.name} </h2>
      <img src={videogameById.image} alt="" />
      <p>ReleaseDate:{videogameById.releaseDate} </p>
      <p>Platforms:{videogameById.platforms} </p>
      <p>{videogameById.description} </p>
      <p>Rating:{videogameById.rating} </p>
    </div>
  );
}

export default Detail;