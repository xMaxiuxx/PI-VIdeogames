import { GET_VIDEOGAMES, GET_BY_NAME, GET_BY_ID, POST_CREATE, GET_GENRES } from "./actions"


let initialState = {allVideogames: [], allVideogamesCopy: [], 
        videogameById: {}, videogameCreated: {}, allGenres: [], 
        activeVideogames: [], isLoading: true}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_VIDEOGAMES:
            return {...state, allVideogames:action.payload, allVideogamesCopy:action.payload, activeVideogames:action.payload, isLoading:false}
        case GET_BY_NAME:
            return {...state, allVideogames:action.payload, activeVideogames:action.payload}
        case GET_BY_ID:
            return {...state, videogameById:action.payload}
        case POST_CREATE:
            return {...state, videogameCreated:action.payload}
        case GET_GENRES:
            return {...state, allGenres:action.payload}
        default:
            return state
    }
}

export default rootReducer