import Card from '../card/card.component';
import './cards.styles.css';

function Cards({allVideogames}) {
  const videogames = allVideogames;
  return (
    <div className="cards-container">
        {videogames?.map(videogame=>
        <Card videogame={videogame}/>
      )}
    </div>
  );
}

export default Cards;
