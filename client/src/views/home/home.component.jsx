import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getVideogamesByName,getGenres,upDateAllvideogames } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Cards from '../../components/cards/cards.component';
import Navbar from '../../components/navbar/navbar.component';
import './home.styles.css';
import { useState } from 'react';

function Home() {
  const GAMES_PER_PAGE = 15;
  const dispatch = useDispatch()
  
  var allVideogames = useSelector((state)=>state.allVideogames);
  const allvideogamesCopy= useSelector((state)=>state.allVideogamesOriginal);
  

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
    console.log("updateGames");
    console.log(allVideogames.length);
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
    console.log("estoy en Next PAge")
    console.log(allVideogames.length);
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
  //!--------------------------------------------------- Filter By Api,DB -----------------------

  const filterByApiDB= (event)=>{
    console.log("estoy en Filtro principio")
    console.log(allVideogames.length);
    if(event.target.value === "All"){
      allVideogames = allvideogamesCopy 
      dispatch(upDateAllvideogames(allvideogamesCopy))
    }else{
      const created = String(event.target.value)
      var filtered = []
      for( let i = 0 ; i< allvideogamesCopy.length; i++ ){
        
        if(String( allvideogamesCopy[i].created )=== created ){
          filtered.push(allvideogamesCopy[i])
        }
      }
      dispatch(upDateAllvideogames(filtered))
      allVideogames = filtered
    }
    updateGames(0);
    setCurrentPage(0);
    console.log("estoy en el filtro  final")
    console.log(allVideogames.length);
  }
  
  
  

  //!--------------------------------------------------- Filter By Genres -----------------------


  const genres = useSelector((state)=>state.allGenres);
  useEffect(()=>{
    dispatch(getGenres())
  },[dispatch])


// const filterGenres  = ()=>{

// }



  const filterByGenres= (event)=>{
    if(event.target.value === "All"){
      allVideogames = allvideogamesCopy
      dispatch(upDateAllvideogames(allvideogamesCopy))
    }else{
      const genre = String(event.target.value)
      var filteredbyGenders = []
      for( let i = 0 ; i< allvideogamesCopy.length; i++ ){
      String(allvideogamesCopy[i].genre)
        if( allvideogamesCopy[i].genres.includes(genre)){
          filteredbyGenders.push(allvideogamesCopy[i])
        }

      }
      allVideogames = filteredbyGenders
      dispatch(upDateAllvideogames(filteredbyGenders))
    }
    updateGames(0);
    setCurrentPage(0);
  }
  
  //!--------------------------------------------------- Sort By rating -----------------------
  
  
  const ratingAsc = ()=>{
    allVideogames = allVideogames.sort((a,b)=>{
        const ratingA = a.rating;
        const ratingB = b.rating;
        if (ratingA < ratingB){ return -1; }
        if (ratingA < ratingB){ return 1; }
        return 0
      })
      dispatch(upDateAllvideogames(allVideogames))
    updateGames(0);
    setCurrentPage(0);
  }

  const ratingDesc = ()=>{
    allVideogames = allVideogames.sort((a,b)=>{
        const ratingA = a.rating;
        const ratingB = b.rating;
        if (ratingA> ratingB){ return -1; }
        if (ratingB > ratingB){ return 1; }
        return 0
      })
      dispatch(upDateAllvideogames(allVideogames))
    updateGames(0);
    setCurrentPage(0);
  }
  
  
  //!--------------------------------------------------- Sort By Name Asc/Desc -----------------------

  const orderAsc = ()=>{
    allVideogames = allVideogames.sort((a,b)=>{
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase()
        if (nameA < nameB){ return -1; }
        if (nameA < nameB){ return 1; }
        return 0
      })
      dispatch(upDateAllvideogames(allVideogames))
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
      dispatch(upDateAllvideogames(allVideogames))
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

      <button className="Buton-Asc-rating" onClick={ratingAsc} > ⭐0/5 </button>
      <button className="Buton-Desc-rating" onClick={ratingDesc} > ⭐5/0 </button>
      <div>
            
            <select className='Filtro-api-db'  onChange={filterByApiDB}> 
              <option value = "All">All Videgomas</option> 
              <option value = "false">API</option> 
              <option value = "true" >BDD</option> 
            </select> 
             <h1> <Link className='buton-link-home' to="/"> Welcome  </Link></h1>
      </div>


      <div>


            <select className='Select-Genre' name="genres" value={genres} onChange={filterByGenres} >
              <option value='select'> Filter for genre</option>
              {genres?.map(genre=>
                <option value={genre} key={genre}>{genre} </option>
              )}
            </select>

      </div>
      
    </div>
  );
};
// onChange llama la funcion 
export default Home;
