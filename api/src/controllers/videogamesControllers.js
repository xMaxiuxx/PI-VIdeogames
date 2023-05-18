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
     //? (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`))
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
    const databaseVideogames = await Videogame.findAll()
// buscar de la api
    const apiVideogamesRaw =  ( await axios.get("https://api.rawg.io/api/games?key=3b1d82ed2fe04c53b0df19e02e0228a8")).data

    // unificar lo que trae
    // const apiVideogames = cleanArray();
    
    //return {... databaseVideogames, ...apiVideogamesRaw};
    return mapResponse(databaseVideogames, apiVideogamesRaw)
};


  const searchVideoGameByName= ()=>{
}

module.exports = {
    createVideogames,
    getVideogameById,
    searchVideoGameByName,
    getAllVideogames,

}
