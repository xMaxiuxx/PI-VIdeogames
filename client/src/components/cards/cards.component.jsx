import Card from '../card/card.component';
import './cards.styles.css';

function Cards({allVideogames}) {
  const videogames = allVideogames;
  if (videogames?.length>0){
    return (
      <div className="cards-container">
          {videogames.map(videogame=> <Card videogame={videogame} key={videogame.id}/>)}
      </div>
    );
  }
  return (
    <div className="cards-container">
        <h2>Game Not Found</h2>
    </div>
  );
}

export default Cards;
