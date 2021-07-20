import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch,  Route} from "react-router-dom";


import Navbar from "./components/Navbar"
import RoutinesList from "./components/RoutinesList";
import EditRoutine from "./components/EditRoutine";
import CreateRoutine from "./components/CreateRoutine";
import CreateUser from "./components/CreateUser";



function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Switch>
      <Route exact path="/">
        <RoutinesList />
      </Route>
      <Route path="/edit/:id">
        <EditRoutine />
      </Route>
      <Route path="/create">
        <CreateRoutine />
      </Route>
      <Route path="/user">
      <CreateUser />
      </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
