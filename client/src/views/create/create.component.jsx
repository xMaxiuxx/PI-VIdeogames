import './create.styles.css';
import { useState } from "react";
import { getGenres, postVideogame } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
  const postVidState = useSelector((state)=>state.videogameCreated);

  function handleSubmit(event){
    event.preventDefault();
    dispatch(postVideogame(form))
    console.log(postVidState)
  }

  const genres = useSelector((state)=>state.allGenres);
  useEffect(()=>{
    dispatch(getGenres())
  },[dispatch])


  return (
    <div className='create-container'>
      <form className='form' onSubmit={handleSubmit}>
        <div>
            <label>Name</label>                                         
            <input type="text" value={form.name} onChange={handleChange} name="name" placeholder='Name'/>
        </div>
        <div>
            <label>Description</label>
            <input type="text" value={form.description} onChange={handleChange} name="description" placeholder='Description'/>
        </div>
        <div>
            <label>Platforms</label>
            <select name="platforms" value={form.platforms} onChange={handleChange} >
              <option value='Android'>Android</option>
              <option value='Linux'>Linux</option>
              <option value='macOS'>macOS</option>
              <option value='PC'>PC</option>
              <option value='PlayStation 3'>PlayStation 3</option>
              <option value='PlayStation 4'>PlayStation 4</option>
              <option value='PlayStation 5'>PlayStation 5</option>
              <option value='Xbox 360'>Xbox 360</option>
              <option value='Xbox One'>Xbox One</option>
              <option value='Xbox Series S/X'>Xbox Series S/X</option>
            </select>
        </div>

        <div>
            <label>Image</label>
            <input type="text" value={form.image} onChange={handleChange} name="image" placeholder='Insert image url'/>
        </div>

        <div>
            <label>Release Date</label>
           <input type="text" value={form.releaseDate} onChange={handleChange} name="releaseDate" placeholder='Release Date'/>
        </div>  
        <div>
            <label>Rating</label>
            <input type="text" value={form.rating} onChange={handleChange} name="rating" placeholder='Rating'/>
        </div>
        <div>
            <label>First Genre</label>
            <select name="genre1" value={form.genre1} onChange={handleChange} >
              <option value='select'>Select one genre</option>
              {genres?.map(genre=>
                <option value={genre}>{genre}</option>
              )}
            </select>
        </div>
        <div>
            <label>Second Genre</label>
            <select name="genre2" value={form.genre2} onChange={handleChange} >
              <option value='select'>Select one genre</option>
              {genres?.map(genre=>
                <option value={genre}>{genre}</option>
              )}
            </select>
        </div>
        <button type="submit">CREATE GAME</button>
      </form>
    </div>
  );
}

export default Create;
