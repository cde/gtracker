import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar />
              <Switch>
                  <Route exact path="/" component={Landing} />
                  <div className="container">
                      <Route exact path="/signup" component={Signup}/>
                      <Route exact path="/login" component={Login}/>
                  </div>
              </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

export default App;
