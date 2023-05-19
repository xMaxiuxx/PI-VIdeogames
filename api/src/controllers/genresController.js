const {Genre} = require("../db");
axios = require("axios")

//Obtiene un arreglo con todos los géneros existentes de la API.
//En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
//Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
const getGenrescontrollers = async () =>{
    const databasegenres = await Genre.findAll();

    if(databasegenres.length === 0){
        const getapiGenres = ( await axios.get(`https://api.rawg.io/api/genres?key=3b1d82ed2fe04c53b0df19e02e0228a8`)).data
        for(let i=0; i< getapiGenres.results.length; i++){
            const name = getapiGenres.results[i].name
            await Genre.create({name:name});
        }
        const mapeado = getapiGenres.results.map(elemento => elemento.name );
        return mapeado
    } 
    const mapeado = databasegenres.map(elemento => elemento.name );
    return mapeado;
}

module.exports = {
    getGenrescontrollers,
}