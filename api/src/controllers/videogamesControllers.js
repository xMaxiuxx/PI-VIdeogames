const{Videogame} = require("../db");

const createVideogames = async  (id, name, description,platform,image,releaseDate,rating)=> 
await Videogame.create({id, name, description,platform,image,releaseDate,rating});





module.exports = {createVideogames}