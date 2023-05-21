import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_BY_ID = "GET_BY_ID"
export const POST_CREATE = "POST_CREATE"

export function getVideogames(){
    return async function(dispatch){
        const response = (await axios("http://localhost:3001/videogames")).data;
        return dispatch({
            type: "GET_VIDEOGAMES",
            payload: response
        })
    };
}

export function getVideogamesByName(name){
    return async function(dispatch){
        const response = (await axios(`http://localhost:3001/videogames?name=${name}`)).data;
        return dispatch({
            type: "GET_BY_NAME",
            payload: response
        })
    };
}

export function getVideogameById(id){
    return async function(dispatch){
        const response = (await axios(`http://localhost:3001/videogames/${id}`)).data;
        return dispatch({
            type: "GET_BY_ID",
            payload: response
        })
    };
}

export function postVideogame(body){
    return async function(dispatch){
        const response = (await axios.post(`http://localhost:3001/videogames`, body)).data;
        return dispatch({
            type: "POST_CREATE",
            payload: response
        })
    };
}
