import './navbar.styles.css';
import { Link } from "react-router-dom"

function Navbar({handleChange, handleSubmit}) {
  return (
    <div className='search-box'>
      <form onChange={handleChange}>
        <input placeholder='Search' type="search"/>
        <button onClick={handleSubmit} type="submit">Search</button>
      </form>
      <Link to="/home">HOME</Link>
      <Link to="/create">FORM</Link>
    </div>
  );
}

export default Navbar;
