//!--------------------------  Este es el enrutador----------------------------------//
const { Router } = require('express');
const server = require('../app');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter= require("../routes/")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

  //!---------------------------------RUTAS -----------------------------//
  router.get("/videogames/:id", (req, res )=>{
    res.status(200).send("Detalle del Id de Videogame");
  });
  router.get("/videogames", (req, res )=>{
    res.status(200).send("Estoy en Videogames");
  });
  //!---------------------------------RUTA Get Genres -----------------------------//
  
  router.get("/genres", (req, res )=>{
      res.status(200).send("Estoy en los generos de videogames");
    });
    
    //!---------------------------------RUTA POST--------------------------//
    router.post("/videogames", (req, res )=>{
        res.status(201).send("Voy a crear un  Videogame");
    });
    router.get("/", (req, res )=>{
      res.status(200).send("OK");
    });

module.exports = router;
