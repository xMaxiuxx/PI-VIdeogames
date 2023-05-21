import {Link} from "react-router-dom";
import './card.styles.css';

function Card({videogame}) {
  //console.log(videogame)

  return (
    <div className="card-container">
      <Link to={`home/${videogame.id}`}><p>{videogame.name} </p></Link>
      <img src={videogame.image} alt="" />
      <h2 classNAme="genres" >GENRES {videogame.      genres} </h2>
      <div>RATING ⭐ {videogame.rating}  </div>
    </div>
  );
}

export default Card;
