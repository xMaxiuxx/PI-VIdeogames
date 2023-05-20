import { useEffect } from "react";
import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import { useDispatch } from "react-redux";
import { getVideogames, } from "../../redux/actions";

const Home = ()=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getVideogames());
    },[dispatch])
    return(
        <>
        <h1> Esta es La Vista De Home </h1> .  
        <CardsContainer />
        </>
    )
}









export default Home;