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

  var platforms = []
  videogameById.platforms?.forEach(platform=>{
      if (platform?.toLowerCase().includes("playstation") && !platforms.includes("/images/playstation.png")){
        platforms.push("/images/playstation.png")
      }
      if (platform?.toLowerCase().includes("xbox") && !platforms.includes("/images/xbox.jpeg")){
        platforms.push("/images/xbox.jpeg")
      }
    } 
  )

  
  var stars = []
  for(let i=1; i<=videogameById.rating; i++){
    stars.push("⭐")
  }
  const blackStars = 5 - stars.length
  for(let i=1; i <= blackStars; i++){
    stars.push("☆")
  }
  
  return (
    
    <div className='detail-container'>
      <h2>{videogameById.name} </h2>
      <img src={videogameById.image} alt="" />
      <p> 𝐑𝐄𝐋𝐄𝐀𝐒𝐄𝐃 {videogameById.releaseDate} </p>
      {/* <p>𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌𝐒 ⚔️⚔️⚔️ {videogameById.platforms} </p> */}
      <div >𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌𝐒
        {platforms.map(platform=> <img className='img-platform' src={platform}/>)}
      </div> 
      <p> {videogameById.description?.replace(/<p>|<\/p>|<br \/>/g, "")}  </p>
      <p> 𝐑𝐀𝐓𝐈𝐍𝐆 {stars} </p>
      <p> 𝐆𝐄𝐍𝐑𝐄𝐒 {videogameById.genres} </p>
    </div>
  );
}

export default Detail;