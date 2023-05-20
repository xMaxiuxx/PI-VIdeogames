import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"


const CardsContainer = ()=>{
	const videogames = useSelector(state=>state.videogames)  
    return(
        <div className={style.container}>
             {videogames.map(videogame =>{
                return <Card 
                
                    id={videogame.id}
                    name={videogame.name}
                    description={videogame.description}
                    platforms={videogame.platforms}
                    image={videogame.image}
                    releaseDate={videogame.releaseDate}
                    rating={videogame.rating}
                    created={videogame.created}

                />
             }

             )}
        </div>
    )
}

export default CardsContainer