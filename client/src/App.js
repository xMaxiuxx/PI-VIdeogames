import {Route} from "react-router-dom"
import Landing from "./views/landing/landing.component";
import Create from './views/create/create.component';
import Detail from './views/detail/detail.component';
import Home from './views/home/home.component';

function App() {
  return (
      <div>
        
        <Route exact path="/home" component={Home}/>
        <Route path="/home/:id" component={Detail}/>
        <Route path="/create" component={Create}/>
        <Route exact path="/" component={Landing}/>
      </div>
  );
}

export default App;
