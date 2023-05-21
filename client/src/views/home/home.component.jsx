import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getVideogames, getVideogamesByName } from '../../redux/actions';

import Cards from '../../components/cards/cards.component';
import Navbar from '../../components/navbar/navbar.component';
import './home.styles.css';
import { useState } from 'react';

function Home() {

    const dispatch = useDispatch()
    const allVideogames = useSelector((state)=>state.allVideogames);

    //Filtro con el backend
    const [searchString, setSearchString] = useState("");    
    function handleChange(event){
      event.preventDefault();
      setSearchString(event.target.value)
    }
    function handleSubmit(event){
      event.preventDefault();
      dispatch(getVideogamesByName(searchString))
    }

    /* filtro sobre estados
    const [filtered, setFiltered] = useState(allVideogames);
    const [searchString, setSearchString] = useState("");

    function handleChange(event){
      event.preventDefault();
      setSearchString(event.target.value)
    }

    function handleSubmit(event){
      event.preventDefault();
      const filtered = allVideogames.filter(videogame=> 
        videogame.name.includes(searchString)
      );
      setFiltered(filtered);
    }*/

    useEffect(()=>{
        dispatch(getVideogames())
        /*
            return (()=>{
                clearDetail()
            })
        */
    },[dispatch])

  return (
    <div className='home'>
      <h2 className='home-title'>Home Page</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={allVideogames}/>
    </div>
  );
}

export default Home;
