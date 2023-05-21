import {Link} from "react-router-dom";
import './card.styles.css';

function Card({videogame}) {
  //console.log(videogame)

  return (
    <div className="card-container">
      <Link to={`home/${videogame.id}`}><p>{videogame.name} </p></Link>
      <img src={videogame.image} alt="" />
      <p>Genres:{videogame.genres} </p>
    </div>
  );
}

export default Card;
