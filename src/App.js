import React, { useEffect, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { auth, db, storage } from './firebase';
import { StateContext } from './context/StateProvider';

import Portal from './components/layout/portal';

function App() {
  const [user, dispatch] = useContext(StateContext)
  const history = useHistory();
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
        });
      }
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authUser');
    dispatch({
      type: 'SET_USER',
      user: JSON.parse(token),
    })
  }, [])

  // const history = useHistory();
  // useEffect(() => {
  //   const token = localStorage.getItem('authUser');
  //   if (!token) {
  //     console.log('yhi sos pwwpp');
  //     history.replace('/login');
  //   }
  // }, [history])

  return (
    <div className="App">
      <Router>
        <Portal />
      </Router>
    </div>
  );
}

export default App;
