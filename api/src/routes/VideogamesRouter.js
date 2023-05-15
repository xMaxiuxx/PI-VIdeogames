const { Router } = require("express")

const videogamesRouter= Router();


  //!---------------------------------RUTAS GET VIDEOGAMES-----------------------------//
    videogamesRouter.get("/:id", (req, res )=>{
        res.status(200).send("NIY : ESTA RUTA TRAE EL DETALLE DE CADA VIDEOGAME");
  });
    videogamesRouter.get("/", (req, res )=>{
        res.status(200).send("NIY : ESTA RUTA TRAE LA INFO DE TODOS LOS VIDEOGAMES");
  });
    //!-------------------------------RUTAS POST VIDEOGAMES-----------------------------//

   videogamesRouter.post("/", (req, res )=>{
    res.status(201).send("NIY: ESTA RUTA CREA UN NUEVO VIDEOGAME");
  });

    // videogamesRouter.get("/", (req, res )=>{
    //     res.status(200).send("OK");
    // });


module.exports = videogamesRouter