import './navbar.styles.css';
import { Link } from "react-router-dom"

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className='search-box'>
      <form >
        <input placeholder='Search' type="search" onChange={handleChange}/>
        <button onClick={handleSubmit}>Search</button>
      </form>
      
      <Link  className='Create-Game ' to="/create">CREATE YOUR GAME</Link>
    </div>
  );
}

export default Navbar;
