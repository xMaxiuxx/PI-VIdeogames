const { Router } = require("express")

const videogamesRouter= Router();

const {getVideogamesHandler, getVideogamesIdHandler, createVideogamesHandler,} = require("../handlers/videogamesHandler")
//!---------------------------------RUTAS GET VIDEOGAMES-----------------------------//
  videogamesRouter.get("/:id", getVideogamesIdHandler);
  videogamesRouter.get("/", getVideogamesHandler);
  
//!---------------------------------RUTAS POST VIDEOGAMES-----------------------------//
  videogamesRouter.post("/", createVideogamesHandler);

module.exports = videogamesRouter