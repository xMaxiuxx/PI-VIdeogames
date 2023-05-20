const { Router } = require("express")

const videogamesRouter= Router();

const {getVideogamesHandler, getVideogamesIdHandler, createVideogamesHandler,} = require("../handlers/videogamesHandler")
  //!---------------------------------RUTAS GET VIDEOGAMES-----------------------------//
    videogamesRouter.get("/:id", getVideogamesIdHandler);
    videogamesRouter.get("/", getVideogamesHandler);



//  Llamar a la funcion que obtiene los datos de la db //
//  Llamar a la funcion que obtiene los datos de la api externa //
//  unir los datos unificando el formato //
//  cuando tengal los datos ,  respondr con  los datos //

  
    //!-------------------------------RUTAS POST VIDEOGAMES-----------------------------//

   videogamesRouter.post("/", createVideogamesHandler);


 
    //!  NIY === NOT IMPLEMENTED YET

module.exports = videogamesRouter