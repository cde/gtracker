import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createUser } from '../../actions/authActions';

import FormGroupField from './../form/FormGroupField';
import { Container, Row, Col, Button } from 'reactstrap';

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: {}
    };

    componentDidMount(){
        console.log("this.props.auth.isAuthenticated", this.props.auth.isAuthenticated)
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/workspace')
        }
    }
    // This runs when component receives new properties
    componentWillReceiveProps(nextProps) {
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
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        this.props.createUser(newUser, this.props.history);

    };

    render() {
        const { errors } = this.state;
        return (
            <Container className="signup">
                <Row>
                    <Col md={6} className="signup-logos">
                        <div className="landing-inner text-light">
                            <div></div>
                        </div>

                    </Col>
                    <Col md={6} className=" m-auto">
                        <h1 className="dark-medium-orange text-center">Let’s start with the basics</h1>
                        <p className="lead text-center">
                            Create an Enlace account
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <FormGroupField
                                placeholder="Username *"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                error={errors.username}
                            />
                            <FormGroupField
                                placeholder="Email *"
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
                            <FormGroupField
                                placeholder="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                value={this.state.password_confirmation}
                                onChange={this.handleInputChange}
                                error={errors.password_confirmation}
                            />
                            <Button type="submit" className="btn btn-lg btn-info-orange btn-block mt-4">Submit</Button>
                        </form>
                    </Col>
                </Row>
                <SocialSignup />
        </Container>
        )
    }

}

Signup.propTypes = {
    auth: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, { createUser })(withRouter(Signup));