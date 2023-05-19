require('dotenv').config();
const {API_KEY} = process.env
const{Videogame} = require("../db");
const axios = require("axios");



//! PREGUNTAR SI SE PUEDE MAPEAR => ? (x)?.map

//!---------------------------------Crea los videogames----------------------
const createVideogames = async  (id, name, description,platform,image,releaseDate,rating)=> 
await Videogame.create({id, name, description,platform,image,releaseDate,rating});

//!--------------------------------------------TRAE todos los videogames por id----------------------------
const getVideogameById = async (id, source) =>  {
    var videogame 
     //source === "api"
     // (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
     //.data 
     //: await Videogame.findByPk(id);
    
    if (source === "api"){
        // videogame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data ;
         videogame = mapResponseFromApi((await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data);

    }else{
        videogame = mapResponseFromDatabase(await Videogame.findByPk(id));
        /// videogame = await Videogame.findByPk(id);
    }

     return videogame;
    };

//!-------------------------------------------Trae todo los videogames de api y bdd------------------------

const mapResponseFromDatabase = (videogame ) =>{
    return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: [videogame.platform],
        image: videogame.image,
        releaseDate: videogame.releaseDate,
        rating:Number(videogame.rating),
        created: true,
    }
}
//! TEST ID
const mapResponseFromApi = (videogame ) =>{
    return {
    
        id: videogame.id.toString(),
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms.map(elem => elem.platform.name),
        image: videogame.background_image,
        releaseDate: videogame.released,
        rating: videogame.rating,
        created: false,
    }
}

function mapResponse(databaseVideogames, apiVideogamesRaw){

    response = []
    for(let i=0; i< databaseVideogames.length ; i++){
        tmp = mapResponseFromDatabase(databaseVideogames[i])
        response.push(tmp)
    }

    for(let i=0;  i< apiVideogamesRaw.results.length ; i++ ){
        tmp = mapResponseFromApi(apiVideogamesRaw.results[i]) 
        response.push(tmp)
    } 
    return response
}

const getAllVideogames = async () =>{
// buscar de la bdd
    const databaseVideogames = await Videogame.findAll();
    
    
    
   
// buscar de la api
    const apiVideogamesRaw =  ( await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data

    // unificar lo que trae
    // const apiVideogames = cleanArray();
    
    //return {... databaseVideogames, ...apiVideogamesRaw};
    return mapResponse(databaseVideogames, apiVideogamesRaw)
};

// Tengo que buscar los videogames por query (name)
const searchVideoGameByName= async  (name)=>{
   /*Esta ruta debe obtener los primeros 15 videojuegos 
   que se encuentren con la palabra recibida por query.

Debe poder buscarlo independientemente de mayúsculas o minúsculas.

Si no existe el videojuego, debe mostrar un mensaje adecuado.

Debe buscar tanto los de la API como los de la base de datos*/


    const databaseVideogames = await Videogame.findAll({where: {name : name }});


    const apiVideogamesRaw =  ( await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data

    // if (mapResponse.length === 0)  res.send('No se encontraron videojuegos.');
        // No se encontraron videojuegos
        return mapResponse(databaseVideogames,apiVideogamesRaw);


}

module.exports = {
    createVideogames,
    getVideogameById,
    searchVideoGameByName,
    getAllVideogames,

}
