const {createVideogames} = require("../controllers/videogamesControllers")
const getVideogamesHandler = (req,  res) =>{
 
  const  {name} = req.query;
  if(name)
    res.send(`quiero buscar todos los videogames que se llamen ${name}`);
  else
    res.send( "Quiero enviar todos los videogames ");


}

const getVideogamesIdHandler = (req, res )=> {

    const {id} = req.params;

   res.status(200).send(`Va a enviar el detalle del videogame de ID ${id}`);

};
const createVideogamesHandler= async (req,  res )=>{
  try {
    const {id, name, description,platform,image,releaseDate,rating} = req.body;
    const newVideogame = await createVideogames(id, name, description,platform,image,releaseDate,rating)
    res.status(201).json({newVideogame})
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};




module.exports = {
    getVideogamesHandler,
    getVideogamesIdHandler,
    createVideogamesHandler,
  
};