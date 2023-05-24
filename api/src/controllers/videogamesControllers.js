require('dotenv').config();
const {API_KEY} = process.env
const{ Videogame, Genre} = require("../db");
const axios = require("axios");
const {Sequelize} = require("sequelize");

var CACHE = {}


//!---------------------------------Crea los videogames----------------------
const createVideogames = async  (id, name, description, platforms, image, releaseDate, rating, genres) => {
    console.log(genres)

    const foundGenres = await Genre.findAll({ where: { name: genres, }, });

    var videogame;

    try{
        videogame = await Videogame.create({id, name, description, platforms, image, releaseDate, rating});
    }catch(error){
        console.log(error)
    }
    await videogame.setGenres(foundGenres); //Es para poder asociar la relacion entre el juego y los generos
    
    //TODO: Ver como no tener que volver a acceder a la DB
    const getVideogame = await Videogame.findByPk(videogame.id, {include:[{model: Genre, as:"genres",through:{attributes:[],}},],})
    // alert("Oops! Something went wrong.");
    return mapResponseFromDatabase(getVideogame); 
}    

//!--------------------------------------------TRAE todos los videogames por id----------------------------
const getVideogameById = async (id, source) =>  {
    var videogame 
    
    if (source === "api"){
         videogame = mapResponseFromApi((await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data);
    }else{
        videogame = mapResponseFromDatabase(
            await Videogame.findByPk(id, {
                include: [ { model: Genre, as: "genres", through: { attributes: [], } }, ],
              })
            );
    }

    return videogame;
};

//!-------------------------------------------Trae todo los videogames de api y bdd------------------------

const mapResponseFromDatabase = (videogame) =>{
    return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description,
        platforms: [videogame.platforms],
        image: videogame.image,
        releaseDate: videogame.releaseDate,
        rating: Number(videogame.rating),
        genres: videogame.genres?.map(genre => genre.name),
        created: true,
    }
}
//! TEST ID
const mapResponseFromApi = (videogame) =>{
    return {
        id: videogame.id.toString(),
        name: videogame.name,
        description: videogame.description,
        platforms: videogame.platforms?.map(elem => elem.platform.name),
        image: videogame.background_image,
        releaseDate: videogame.released,
        rating: videogame.rating,
        genres: videogame.genres?.map(genre => genre.name),
        created: false,
    }
}

function mapResponse(databaseVideogames, apiVideogamesRaw){
    response = []
    for(let i=0; i < databaseVideogames.length ; i++){
        tmp = mapResponseFromDatabase(databaseVideogames[i])
        response.push(tmp)
    }

    for(let i=0;  i < apiVideogamesRaw.results.length ; i++ ){
        tmp = mapResponseFromApi(apiVideogamesRaw.results[i]) 
        response.push(tmp)
    } 
    return response
}

const getAllVideogames = async () =>{
    const databaseVideogames = await Videogame.findAll({
        include: [ { model: Genre, as: "genres", through: { attributes: [], } }, ],
    });
   
    var apiVideogamesRaw = {results:[]}
    var url = `https://api.rawg.io/api/games?key=${API_KEY}`
    for(let i=0; i<=4; i++){
        var response
        if(`generalUrl${i}` in CACHE === true){
            response = CACHE[`generalUrl${i}`]
        }else{
            response = ( await axios.get(url)).data
            CACHE[`generalUrl${i}`] = response
        }
        url = response.next
        apiVideogamesRaw.results = apiVideogamesRaw.results.concat(response.results)
    }
    console.log(apiVideogamesRaw.results.length)
    return mapResponse(databaseVideogames, apiVideogamesRaw)
};

const searchVideoGameByName = async  (name)=>{
   /*Esta ruta debe obtener los primeros 15 videojuegos 
   que se encuentren con la palabra recibida por query.
    Debe poder buscarlo independientemente de mayúsculas o minúsculas.
    Si no existe el videojuego, debe mostrar un mensaje adecuado.
    Debe buscar tanto los de la API como los de la base de datos*/
    var apiVideogamesRaw = [];
    const databaseVideogames = await Videogame.findAll({where: {name: {[Sequelize.Op.iLike]: `%${name}%`}}}, {
            include: [ { model: Genre, as: "genres", through: { attributes: [], } }, ], });

    if (databaseVideogames?.length < 15){
        apiVideogamesRaw =  ( await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data
    }
    

    // if (mapResponse.length === 0)  res.send('No se encontraron videojuegos.');
    // No se encontraron videojuegos
    return mapResponse(databaseVideogames, apiVideogamesRaw).slice(0, 15);
}

module.exports = {
    createVideogames,
    getVideogameById,
    searchVideoGameByName,
    getAllVideogames,

}
