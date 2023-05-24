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

  const handleFChange = (event)=>{
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
            <input type="text" value={form.name} onChange={handleFChange} name="name" placeholder='Name' key='name'/>
        </div>
        <div>
            <label>Description</label>
            <input type="text" value={form.description} onChange={handleFChange} name="description" placeholder='Description' key='description'/>
        </div>
        <div>
            <label>Platforms</label>
            <select name="platforms" value={form.platforms} onChange={handleFChange} key='platforms'>
              <option value='Android' key='Android'>Android</option>
              <option value='Linux' key='Linux'>Linux</option>
              <option value='macOS' key='macOS'>macOS</option>
              <option value='PC' key='PC'>PC</option>
              <option value='PlayStation 3' key='PlayStation 3'>PlayStation 3</option>
              <option value='PlayStation 4' key='PlayStation 4'>PlayStation 4</option>
              <option value='PlayStation 5' key='PlayStation 5'>PlayStation 5</option>
              <option value='Xbox 360' key='Xbox 360'>Xbox 360</option>
              <option value='Xbox One' key='Xbox One'>Xbox One</option>
              <option value='Xbox Series S/X' key='Xbox Series S/X'>Xbox Series S/X</option>
            </select>
        </div>

        <div>
            <label>Image</label>
            <input type="text" value={form.image} onChange={handleFChange} name="image" placeholder='Insert image url' key='image'/>
        </div>

        <div>
            <label>Release Date</label>
           <input type="text" value={form.releaseDate} onChange={handleFChange} name="releaseDate" placeholder='Release Date' key='releaseDate'/>
        </div>  
        <div>
            <label>Rating</label>
            <input type="text" value={form.rating} onChange={handleFChange} name="rating" placeholder='Rating' key='rating'/>
        </div>
        <div>
            <label>First Genre</label>
            <select name="genre1" value={form.genre1} onChange={handleFChange} key='genre1'>
              <option value='select'>Select one genre</option>
              {genres?.map(genre=>
                <option value={genre} key={genre}>{genre}</option>
              )}
            </select>
        </div>
        <div>
            <label>Second Genre</label>
            <select name="genre2" value={form.genre2} onChange={handleFChange} key='genre2'>
              <option value='select'>Select one genre</option>
              {genres?.map(genre=>
                <option value={genre} key={genre}>{genre}</option>
              )}
            </select>
        </div>
        <button type="submit">CREATE GAME</button>
      </form>
    </div>
  );
}

export default Create;
