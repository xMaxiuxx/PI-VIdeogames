import './create.styles.css';
import { useState } from "react";
import { postVideogame } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Create() {

  const [form, setForm] = useState({
      name: "",
      description: "",
      platforms: "",
      image: "",
      releaseDate: "",
      rating: "",
      genre1: "",
      genre2: "",
  })

  const [errors, setErrors] = useState({
      name: "",
      description: "",
      platforms: "",
      image: "",
      releaseDate: "",
      rating: "",
      genre1: "",
      genre2: "",
  })

  const handleChange = (event)=>{
      const property = event.target.name;
      const value = event.target.value;

      validate({...form, [property]:value})
      setForm({...form,[property]:value })
  }
  const validate=(form)=>{
    //if(!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.mail))
    if (errors){

    }
    setErrors()
  }

  const dispatch = useDispatch();
  const postVidState = useSelector((state)=>state.createVideogame);

  function handleSubmit(event){
    event.preventDefault();
    dispatch(postVideogame(form))
    console.log(postVidState)
  }


  return (
    <div className='create-container'>
      <form onSubmit={handleSubmit}>
        <div>
            <label>Name</label>                                         
            <input type="text" value={form.name} onChange={handleChange} name="name" />
        </div>
        <div>
            <label>Description</label>
            <input type="text" value={form.description} onChange={handleChange} name="description" />
        </div>
        <div>
            <label>Platforms</label>
            <input type="text" value={form.platforms} onChange={handleChange} name="platforms" />
        </div>

        <div>
            <label>Image</label>
            <input type="text" value={form.image} onChange={handleChange} name="image" />
        </div>

        <div>
            <label>Release Date</label>
           <input type="text" value={form.releaseDate} onChange={handleChange} name="releaseDate" />
        </div>  
        <div>
            <label>Rating</label>
            <input type="text" value={form.rating} onChange={handleChange} name="rating" />
        </div>
        <button type="submit">CREATE GAME</button>
      </form>
    </div>
  );
}

export default Create;
