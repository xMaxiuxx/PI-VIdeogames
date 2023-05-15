
const { Router } = require('express');

const genres = Router();
  //!---------------------------------RUTA Get Genres -----------------------------//
  
 
genres.get("/", (req, res )=>{
    res.status(200).send("NIY: ESTA RUTA TRAE TODOS LOS GENEROS DE VIDEOGAMES");
  });


module.exports = genres;