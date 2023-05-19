import { Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import {Home,Detail,Landing,Form} from "./views"


function App() {
  const location = useLocation()
  
  return (
    <div className="App">
      {location.pathname!=="/" && <NavBar/>}
    <Route exact path="/create" render={()=> <Form />} />
    <Route exact path="/home" render={()=> <Home />} />
    <Route exact path="/" render={()=> <Landing />} />
    <Route exact path="/detail" render={()=> <Detail />} />







    </div>
  );
}

export default App;
