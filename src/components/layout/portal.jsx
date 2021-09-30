import React, { useContext, useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import Home from '../Home';
import Messages from '../Messages';
import Explore from '../Explore';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import { StateContext } from '../../context/StateProvider';
import Header from '../Header';
import StoryViewer from '../home/story-viewer';
// import { IntercomProvider } from 'react-use-intercom';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     logHere(error, errorInfo);
//   }

//   render() {
//     const { children } = this.props;
//     const { hasError } = this.state;
//     if (hasError) {
//       return (
//         <div className="something-wrong">
//           <div className="something-wrong--inner">
//             <i>
//               <svg width="84" height="62" viewBox="0 0 84 62" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M47 30H37V34H47V30Z" fill="#EE5555" />
//                 <path d="M51 34H47V38H51V34Z" fill="#EE5555" />
//                 <path d="M37 34H33V38H37V34Z" fill="#EE5555" />
//                 <path d="M49 16H45V24H49V16Z" fill="#EE5555" />
//                 <path d="M39 16H35V24H39V16Z" fill="#EE5555" />
//                 <path d="M81 0H3C1.3 0 0 1.3 0 3V51C0 52.7 1.3 54 3 54H40V58H22C20.9 58 20 58.9 20 60C20 61.1 20.9 62 22 62H40H44H62C63.1 62 64 61.1 64 60C64 58.9 63.1 58 62 58H44V54H81C82.7 54 84 52.7 84 51V3C84 1.3 82.7 0 81 0ZM80 50H44H40H4V4H80V50Z" fill="#EE5555" />
//               </svg>
//             </i>
//             <h3>Something went wrong.</h3>
//           </div>
//         </div>
//       );
//     }

//     return children;
//   }
// }

// const APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;
// const renderComponents = (
//   <Switch>
//     {portalRoutes.map((prop) => {
//       if (prop.redirect) {
//         return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
//       }
//       return (
//         <Route
//           path={prop.path}
//           exact={prop.exact}
//           component={prop.component}
//           key={prop.key}
//         />
//       );
//     })}
//   </Switch>
// );


const Portal = () => {
  const history = useHistory();
  const [user, dispatch] = useContext(StateContext)

  useEffect(() => {
    const token = localStorage.getItem('authUser');
    if (!token) {
      history.push('/login');
    }
  }, [history]);

  return (
      <React.Fragment>
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
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/stories/:id" render={(props) => <StoryViewer {...props} />} />

          <Route exact path="/">
            {user ?
              <Redirect to="/home" />
              :
              <Redirect to="/login" />
            }
          </Route>
        </Switch>
      </React.Fragment>
  );
};
export default Portal;
