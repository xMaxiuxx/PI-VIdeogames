const {createVideogames, getVideogameById, searchVideoGameByName, getAllVideogames} = require("../controllers/videogamesControllers")


 //!!const source ="api" "bdd"
 
const getVideogamesHandler = async (req,  res) => {
  const {name} = req.query;
  const results = name ? await searchVideoGameByName(name) : await getAllVideogames();
  
  res.status(200).json(results);
};

const getVideogamesIdHandler = async (req, res )=> {
  const {id} = req.params;
  const source = isNaN(id)  ? "bdd" : "api";
   
  try {
    const videogame = await getVideogameById(id, source);
    res.status(200).json(videogame);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const createVideogamesHandler= async (req,  res )=>{
  const {id, name, description, platforms, image, releaseDate, rating, genres} = req.body;
  try {
    const newVideogame = await createVideogames(id, name, description, platforms, image, releaseDate, rating, genres)
    res.status(201).json(newVideogame)
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};

module.exports = {
    getVideogamesHandler,
    getVideogamesIdHandler,
    createVideogamesHandler,  
};