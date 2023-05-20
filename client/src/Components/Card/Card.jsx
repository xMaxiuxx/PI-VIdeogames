import style from "./Card.module.css";
const Card = (props)=>{
    return (
        <div className={style.card} >
            <p>{props.name} </p>
            {/* <p>Id:{props.id} </p> */}
            <img src={props.image} alt="" />
            <p>Platforms:{props.platforms} </p>
            <p>{props.description} </p>
             <p>ReleaseDate:{props.releaseDate} </p>
             <p>Rating:{props.rating} </p>
             {/* <p>Created:{props.created} </p> */}
        </div>
    )
}
export default Card;