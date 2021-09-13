import React, { useEffect, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { auth, db, storage } from './firebase';
import { StateContext } from './context/StateProvider';

import Header from './components/Header';
import Messages from './components/Messages';
import Explore from './components/Explore'
import Add from './components/Add';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  const [user, dispatch] = useContext(StateContext)

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        localStorage.removeItem('authUser', JSON.stringify(authUser))
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home">
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            {user ?
              <Redirect to="/home" />
              :
              <Redirect to="/login" />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
