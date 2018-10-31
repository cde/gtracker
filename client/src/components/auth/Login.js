import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authActions';

import FormGroupField from './../form/FormGroupField';
import { Container, Row, Col } from 'reactstrap';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/workspace')
        }
    }
    // This runs when component receives new properties
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/workspace');
        }
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(user);
        this.props.loginUser(user);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <Container fluid={true}>
                    <Row>
                        <Col md={6} className="landing-login">
                            <div className="dark-overlay landing-inner text-light">
                                <div></div>
                            </div>

                        </Col>
                        <Col md={3} className='m-auto'>
                            <div>
                                <h2 className="text-center">Welcome back</h2>
                                <p className="text-center">New to Enlace?
                                    <Link to='/signup'> Sign Up</Link>
                                </p>
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <FormGroupField
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                <FormGroupField
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    error={errors.password}
                                />
                                <input type="submit" className="btn btn-lg btn-info-orange btn-block mt-4"/>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));