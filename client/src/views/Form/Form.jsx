import axios from "axios"
import { useState } from "react";
const Form = ()=>{
    const [form,setForm] = useState({
        name:"",
        description:"",
        platforms:"",
        image:"",
        releaseDate:"",
        rating:"",

    })
    const [errors,setErrors] = useState({
        name:"",
        description:"",
        platforms:"",
        image:"",
        releaseDate:"",
        rating:"",

    })


    const changeHandler = (event)=>{
        const property = event.target.name;
        const value = event.target.value;

        validate({...form, [property]:value})
        setForm({...form,[property]:value })
    }
    const validate=(form)=>{
       if( setErrors({...errors,name:""})){

       }
       else{

       } 
       setErrors({...errors,name:"error in name"})
        if(form.name==="") setErrors({errors,name:"Campo Vacio"})
    }

    const submitHandler =(event) =>{
        event.preventDefault()
        axios.post("http://localhost:3001/videogames",form)
        .then(res => alert (res))
        
    }



    return(
        <form onSubmit = {submitHandler}>
        <div>
            <label>Name</label>                                         
            <input type="text" value={form.name} onChange={changeHandler} name="name" />
        </div>
        <div>
            <label>Description</label>
            <input type="text" value={form.description} onChange={changeHandler} name="description" />
        </div>
        <div>
            <label>Platforms</label>
            <input type="text" value={form.platforms} onChange={changeHandler} name="platforms" />
        </div>

        <div>
            <label>Image</label>
            <input type="text" value={form.image} onChange={changeHandler} name="image" />
        </div>

        <div>
            <label>releaseDate</label>
           <input type="text" value={form.releaseDate} onChange={changeHandler} name="releaseDate" />
        </div>  
        <div>
            <label>Rating</label>
            <input type="text" value={form.rating} onChange={changeHandler} name="rating" />
        </div>
        <button type="submit">CREATE GAME</button>
        </form>
        
    )
}
export default Form;