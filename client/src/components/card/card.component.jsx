import {Link} from "react-router-dom";
import './card.styles.css';

function Card({videogame}) {
  //console.log(videogame)


  var stars = []
  for(let i=1; i<=videogame.rating; i++){
    stars.push("⭐")
  }

  const blackStars = 5 - stars.length
  
  for(let i=1; i <= blackStars; i++){
    stars.push("☆")
  }

  return (
    <div className="card-container">
      <Link to={`home/${videogame.id}`}><p>{videogame.name} </p></Link>
      <img src={videogame.image} alt="" />
      <h2 className="genres" >Ꮆ乇几尺乇丂 {videogame.genres} </h2>
      <div>RATING {stars}  </div>
    </div>
  );
}

export default Card;
