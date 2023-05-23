import './navbar.styles.css';
import { Link } from "react-router-dom"

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className='search-box'>
      <form >
        <input placeholder='Search' type="search" onChange={handleChange}/>
        <button onClick={handleSubmit} type="submit">Search</button>
      </form>
      <Link className='Home-Cave' to="/home">HOME CAVE</Link>
      <Link  className='Create-Game ' to="/create">CREATE GAME</Link>
    </div>
  );
}

export default Navbar;
