import './landing.styles.css';
import { Link } from 'react-router-dom';

function Landing() {
  
  return (
    <div className='landing-container'>
    <h2 className='landing-title'>Welcome Pi Maxi</h2>
      {/* <img src={videogameById.image} alt="" />
      <p>ReleaseDate:{videogameById.releaseDate} </p>
      <p>Platforms:{videogameById.platforms} </p>
      <p>{videogameById.description} </p>
      <p>Rating:{videogameById.rating} </p>
      <p>Genres:{videogameById.genres} </p> */}
      <button><Link to="/home"> GO CAVE GAMES</Link></button>
    </div>
  );
}

export default Landing;