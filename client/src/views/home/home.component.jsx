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
    activeVideogames = [...allVideogames].splice(0,GAMES_PER_PAGE)
  }
  useEffect(()=>{
    dispatch(getVideogames());
  },[dispatch])

  //!--------------------------------------------------- Paginado-----------------------
  const GAMES_PER_PAGE = 20;
  //const [games ,setGames] = useState([...allVideogames].splice(0,GAMES_PER_PAGE))
  var activeVideogames = (useSelector((state)=>state.activeVideogames)).splice(0,GAMES_PER_PAGE);
  const [currentPage,setCurrentPage]= useState(0);

  const nextHandler = ()=>{
    console.log(`nextHandler ${allVideogames.lenght}`);
    const totalVideogames = allVideogames.lenght;
    const nextPage = currentPage +1 ;
    const firstGame = nextPage * GAMES_PER_PAGE;
    if (firstGame >= totalVideogames) return;
    activeVideogames = [...allVideogames].splice(firstGame,GAMES_PER_PAGE)
    setCurrentPage(nextPage);
  }

  const prevHandler= ()=>{
    console.log(`prevHandler ${allVideogames.lenght}`);
    const prevPage = currentPage -1;
    if (prevPage < 0)return;
    const firstGame = prevPage * GAMES_PER_PAGE;
    activeVideogames = [...allVideogames].splice(firstGame,GAMES_PER_PAGE)
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
    activeVideogames = allVideogames.splice(0,GAMES_PER_PAGE)
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
    activeVideogames = allVideogames.splice(0, GAMES_PER_PAGE)
    setCurrentPage(0);
  }

  //!--------------------------------------------------- Loading -----------------------
  const isLoading = useSelector((state)=>state.isLoading);

  if (isLoading) {
    return (<div className='home'>
              { <img className='gif-home' src="/images/loading.gif" alt=""/> }
            </div>
      );
  }
  return (
    <div className='home'>
      <h1 className='home-title'>Cave Of Games</h1>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
      <Cards allVideogames={activeVideogames}/>
      <button className=" Buton-Prev" onClick={prevHandler}>Prev</button>
      <button className=" Buton-Next"onClick={nextHandler} >Next</button>
      <button className=" Buton-Asc"onClick={orderAsc} >Order Asc</button>
      <button className=" buton-Desc"onClick={orderDesc} >Order Desc</button>
    </div>
  );
}

export default Home;
