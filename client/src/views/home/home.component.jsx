import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getVideogamesByName } from '../../redux/actions';

import Cards from '../../components/cards/cards.component';
import Navbar from '../../components/navbar/navbar.component';
import './home.styles.css';
import { useState } from 'react';

function Home() {
  const dispatch = useDispatch()
  var allVideogames = useSelector((state)=>state.allVideogames);
  
  //Filtro con el backend
  const [searchString, setSearchString] = useState("");    
  function handleChange(event){
    event.preventDefault();
    setSearchString(event.target.value)
  }
  function handleSubmit(event){
    event.preventDefault();
    dispatch(getVideogamesByName(searchString))
    setGames([...allVideogames].splice(0,GAMES_PER_PAGE))
  }
  useEffect(()=>{
    dispatch(getVideogames());
    setGames([...allVideogames].splice(0,GAMES_PER_PAGE))
    setCurrentPage(0);
  },[dispatch])

  //!--------------------------------------------------- Paginado-----------------------
  const GAMES_PER_PAGE = 20;
  const [games ,setGames] = useState([...allVideogames].splice(0,GAMES_PER_PAGE))
  const [currentPage,setCurrentPage]= useState(0);

  const nextHandler = ()=>{
    console.log(`nextHandler ${allVideogames.lenght}`);
    const totalVideogames = allVideogames.lenght;
    const nextPage = currentPage +1 ;
    const firstGame = nextPage * GAMES_PER_PAGE;
    if (firstGame >= totalVideogames) return;
    setGames([...allVideogames].splice(firstGame,GAMES_PER_PAGE))
    setCurrentPage(nextPage);
  }

  const prevHandler= ()=>{
    console.log(`prevHandler ${allVideogames.lenght}`);
    const prevPage = currentPage -1;
    if (prevPage < 0)return;
    const firstGame = prevPage * GAMES_PER_PAGE;
    setGames([...allVideogames].splice(firstGame,GAMES_PER_PAGE))
    setCurrentPage(prevPage);
  }

  //!--------------------------------------------------- Ordenamiento por nombre -----------------------
  const orderAsc = ()=>{
    console.log(`orderAsc ${allVideogames.lenght} before`);
    allVideogames = allVideogames.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB){ return -1; }
        if (nameA < nameB){ return 1; }
        return 0
      })
    console.log(`orderAsc ${allVideogames.lenght} after`);
    setGames(allVideogames.splice(0,GAMES_PER_PAGE))
    setCurrentPage(0);
  }

  const orderDesc = ()=>{
    console.log(`orderDesc ${allVideogames.lenght} before`);
    allVideogames = allVideogames.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB){ return -1; }
        if (nameA > nameB){ return 1; }
        return 0
      })
    console.log(`orderDesc ${allVideogames.lenght} after`);
    setGames(allVideogames.splice(0, GAMES_PER_PAGE))
    setCurrentPage(0);
  }


  return (
    <div className='home'>
      <h1 className='home-title'>GAMES HOME</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={games}/>
      <button onClick={prevHandler}>Prev</button>
      <button onClick={nextHandler} >Next</button>
      <button onClick={orderAsc} >Order Asc</button>
      <button onClick={orderDesc} >Order Desc</button>
    </div>
  );
}

export default Home;
