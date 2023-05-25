import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getVideogamesByName } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Cards from '../../components/cards/cards.component';
import Navbar from '../../components/navbar/navbar.component';
import './home.styles.css';
import { useState } from 'react';



function Home() {
  const GAMES_PER_PAGE = 20;
  const dispatch = useDispatch()
  
  var allVideogames = useSelector((state)=>state.allVideogames);
  const allvideogamesCopy= useSelector((state)=>state.allVideogames);
  useEffect(()=>{
    dispatch(getVideogames());
  },[dispatch])
  
  const isLoading = useSelector((state)=>state.isLoading);

  const [games ,setGames] = useState([...allVideogames].splice(0,GAMES_PER_PAGE))
  const [currentPage,setCurrentPage]= useState(0);
  const [searchString, setSearchString] = useState("");    

  useEffect(() => {
    if (allVideogames.length > 0) {
      setGames(allVideogames.slice(0, GAMES_PER_PAGE));
    }
  }, [allVideogames]);

  const updateGames = (init) => {
    const updatedGames = [...allVideogames].splice(init, GAMES_PER_PAGE);
    setGames(updatedGames);
  };

  //!--------------------------------------------------- Search by Name-----------------------

  function handleChange(event){
    event.preventDefault();
    setSearchString(event.target.value)
  }
  function handleSubmit(event){
    event.preventDefault();
    dispatch(getVideogamesByName(searchString))
    updateGames(0);
  }
  
  //!--------------------------------------------------- Pages-----------------------
  const nextHandler = ()=>{
    const totalVideogames = allVideogames.length;
    const nextPage = currentPage +1 ;
    const firstGame = nextPage * GAMES_PER_PAGE;
    if (firstGame >= totalVideogames) return;
    updateGames(firstGame);
    setCurrentPage(nextPage);
  }

  const prevHandler= ()=>{
    const prevPage = currentPage -1;
    if (prevPage < 0)return;
    const firstGame = prevPage * GAMES_PER_PAGE;
    updateGames(firstGame);
    setCurrentPage(prevPage);
  }
  //!--------------------------------------------------- Filter By name -----------------------
 
  const filterByApiDB= (event)=>{
    if(event.target.value === "All"){
      allVideogames = allvideogamesCopy
    }else{
      const created = String(event.target.value)
      var filtered = []
      for( let i = 0 ; i< allvideogamesCopy.length; i++ ){
        console.log(created)
        console.log(String(allvideogamesCopy[i].created))
        if(String( allvideogamesCopy[i].created )=== created ){
          filtered.push(allvideogamesCopy[i])
        }
      }
      allVideogames = filtered
    }
    updateGames(0);
    setCurrentPage(0);
  }
  //!--------------------------------------------------- Sort By nombre -----------------------
  const orderAsc = ()=>{
    allVideogames = allVideogames.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB){ return -1; }
        if (nameA < nameB){ return 1; }
        return 0
      })
    updateGames(0);
    setCurrentPage(0);
  }

  const orderDesc = ()=>{
    allVideogames = allVideogames.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB){ return -1; }
        if (nameA > nameB){ return 1; }
        return 0
      })
    updateGames(0);
    setCurrentPage(0);
  }

  //!--------------------------------------------------- Loading -----------------------
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
      <Cards allVideogames={games}/>
      <button className="Buton-Prev" onClick={prevHandler} > ⇦ </button>
      <button className="Buton-Next" onClick={nextHandler} > ⇨ </button>
      <button className="Buton-Asc" onClick={orderAsc} > A/Z</button>
      <button className="Buton-Desc" onClick={orderDesc} > Z/A </button>
      <div>
            <label> <h1> FILTRO </h1></label>
            <select className='Filtro-api-db'  onChange={filterByApiDB}> 
              <option value = "All"> <h1> All Videgomas</h1> </option> 
              <option value = "false"> <h1> API</h1> </option> 
              <option value = "true" > <h1> BDD</h1> </option> 
            </select> 
            <top> <h1> <Link className='buton-link-home' to="/"> Welcome  </Link></h1> </top>
        </div>
      
    </div>
  );
}
// onChange llama la funcion 
export default Home;
