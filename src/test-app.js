import React, { useEffect, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { auth, db, storage } from './firebase';
import { StateContext } from './context/StateProvider';
import baseRoutes from './routes/index';

import Header from './components/Header';
import Messages from './components/Messages';
import Explore from './components/Explore'
import Add from './components/Add';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function TestApp() {
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
    <React.Fragment>
      <Router>
        <Switch>
          {baseRoutes.map((prop) => {
            if (prop.redirect) {
              return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
            }
            return (
              <Route
                path={prop.path}
                exact={prop.exact}
                component={prop.component}
                key={prop.key}
              />
            );
          })}
        </Switch>
      </Router>
  </React.Fragment>
  );
}

export default TestApp;
