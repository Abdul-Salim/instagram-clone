import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Messages from './components/Messages';
import Explore from './components/Explore'
import Add from './components/Add';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/message">
            <Header />
            <Messages />
          </Route>
          <Route exact path="/explore">
            <Header />
            <Explore />
          </Route>
          <Route exact path="/add">
            <Header />
            <Add />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
