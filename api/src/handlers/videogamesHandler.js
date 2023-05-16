const {createVideogames, getVideogameById} = require("../controllers/videogamesControllers")

 //!!const source ="api" "bdd"
 
 const getVideogamesHandler = (req,  res) =>{
   
   const  {name} = req.query;
   if(name)
   res.send(`quiero buscar todos los videogames que se llamen ${name}`);
   else
   res.send( "Quiero enviar todos los videogames ");
   
   
  }
  
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

  const {id, name, description,platform,image,releaseDate,rating} = req.body;
  try {
    const newVideogame = await createVideogames(id, name, description,platform,image,releaseDate,rating)
    res.status(201).json({newVideogame})
  } catch (error) {
    res.status(500).json({error:error.message});
  }
};




module.exports = {
    getVideogamesHandler,
    getVideogamesIdHandler,
    createVideogamesHandler,
  
};