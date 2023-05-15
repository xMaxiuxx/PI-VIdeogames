//!--------------------------  Este es el enrutador----------------------------------//
const { Router } = require('express');
const server = require('../app');
const genres = require('./genres');
const videogamesRouter = require("./videogamesRouter")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use ("/videogames", videogamesRouter)
router.use("/genres",genres)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
