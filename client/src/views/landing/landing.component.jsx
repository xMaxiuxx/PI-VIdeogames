import './landing.styles.css';
import { Link } from 'react-router-dom';

function Landing() {
  
  return (
    <div className='landing-container'>
    <h1 className='landing-title'>Welcome to cave of games</h1 >
      {/* <img src={videogameById.image} alt="" />
      <p>ReleaseDate:{videogameById.releaseDate} </p>
      <p>Platforms:{videogameById.platforms} </p>
      <p>{videogameById.description} </p>
      <p>Rating:{videogameById.rating} </p>
      <p>Genres:{videogameById.genres} </p> */}
     <center> <h1> <Link className='buton-link' to="/home"> Go to Cave of Games</Link></h1> </center>
     <h1 className='landing-titlePI'>PI MAXIMILIANO GATICA</h1 >
    </div>
  );
}

export default Landing;