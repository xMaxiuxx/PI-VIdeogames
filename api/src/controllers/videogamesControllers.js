const{Videogame} = require("../db");
const axios = require("axios");
const createVideogames = async  (id, name, description,platform,image,releaseDate,rating)=> 
await Videogame.create({id, name, description,platform,image,releaseDate,rating});


const getVideogameById = async (id, source) =>  {
    const videogame =
     source === "api"
     ? (await axios.get(`https://api.rawg.io/api/games/${id}?key=3b1d82ed2fe04c53b0df19e02e0228a8`))
     .data 
     : await Videogame.findByPk(id);
    
     return videogame;
    };


module.exports = {createVideogames,getVideogameById}

