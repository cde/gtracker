import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile} from "./actions/profileUserActions";

import { Provider } from 'react-redux';
import store from './store';


// **** Routes ****
import PrivateRoute from './components/misc/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import Workspace from "./components/workspace/Workspace";
import CreateProfile from "./components/create-profile/CreateProfile";

import './App.css';

// Check for tokens
if(localStorage.jwtToken) {
    // set auth header
    const jwtToken = localStorage.jwtToken;
    setAuthToken(jwtToken);
    // decode token
    const decoded = jwt_decode(jwtToken);
    // Set isAuthenticate and user
    store.dispatch(setCurrentUser(decoded));

    // check for expired token
    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = '/login';
    }
}

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
              <div className="App">
                  <Navbar/>

                  <Route exact path="/" component={Landing} />
                  <Route exact path="/signup" component={SignUp}/>
                  <Route exact path="/login" component={Login}/>
                  <Switch>
                      <PrivateRoute exact path="/workspace" component={Workspace}/>
                  </Switch>
                  <Switch>
                      <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                  </Switch>
                  <Footer/>
              </div>
            </Router>
      </Provider>
    );
  }
}

export default App;
