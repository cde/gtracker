import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class SocialSignup extends Component {
    state = {
        username: '',
        password: '',
        errors: {}
    };

    render() {
        return (
            <Row className="social-signup" style={{marginTop: '10px' }}>
                <Col md={6} className="m-auto">
                    <div className="oauth-button" id="login-twitter">
                        <a className="btn btn-primary" data-track="signup.clicked_twitter" href="/users/auth/twitter">
                            <div className="continue-with">
                                Continue with Twitter
                            </div>
                            <span className="fab fa-twitter"></span>
                        </a>
                    </div>
                    <div className="oauth-button" id="login-bitbucket">
                        <a className="btn bg-dark-blue" data-track="signup.clicked_bitbucket"
                           href="/users/auth/bitbucket">
                            <div className="continue-with">
                                Continue with Bitbucket
                            </div>
                            <i className="fab fa-bitbucket"></i>
                        </a>
                    </div>
                </Col>
                <Col>
                    <div className="oauth-button" id="login-gitlab">
                        <a className="btn bg-dark-blue" data-track="signup.clicked_gitlab" href="/users/auth/gitlab">
                            <div className="continue-with">
                                Continue with Gitlab
                            </div>
                            <i className="fab fa-gitlab"></i>
                        </a>
                    </div>
                    <div className="oauth-button" id="login-github">
                        <a className="btn bg-dark-orange" data-track="signup.clicked_github" href="/users/auth/github">
                            <div className="continue-with">
                                Continue with Github
                            </div>
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default SocialSignup;