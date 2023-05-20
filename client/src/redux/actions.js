import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"

export const getVideogames =  () => {
    
    return async function (dispatch){
        const videogamesapiData = await axios.get(
            "http://localhost:3001/videogames"
        );
        const videogames = videogamesapiData.data;
        dispatch({ type: GET_VIDEOGAMES,  payload: videogames});

    };
};
