require('dotenv').config();
const {API_KEY} = process.env
const{Videogame} = require("../db");
const axios = require("axios");


const createVideogames = async  (id, name, description,platform,image,releaseDate,rating)=> 
await Videogame.create({id, name, description,platform,image,releaseDate,rating});


const getVideogameById = async (id, source) =>  {
    const videogame =
     source === "api"
     ? (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
     .data 
     : await Videogame.findByPk(id);
    
     return videogame;
    };



    

module.exports = {createVideogames,getVideogameById}

