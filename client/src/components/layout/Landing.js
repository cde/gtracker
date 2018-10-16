import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                  <div className="enlace">
                    <h1 className="display-3 mb-4" >Coder Enlace</h1>
                    <p className="lead ">
                      {' '}
                      Create a developer profile/portfolio, share posts, your favorite tech stack and events.
                      <br/>
                      Get a personalized feed of the latest news for your tech stack
                      <br/>
                       Get a personalized feed of your favorite developers
                    </p>
                  </div>
                <hr />
                <Link to="/signup" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
