
const { Router } = require('express');
const {getGenresHandler} = require("../handlers/genresHandler")
const genres = Router();
  //!---------------------------------RUTA Get Genres -----------------------------//

  genres.get("/" , getGenresHandler)

module.exports = genres;