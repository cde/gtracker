import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import FormGroupField from './../form/FormGroupField';

import { connect } from 'react-redux';
import { createUser } from '../../actions/authActions';

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: {}
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        console.log(event);
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        // console.log(newUser);
        this.props.createUser(newUser);
        // axios.post('/api/users/create', newUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => {
        //         this.setState({ errors: err.response.data })
        //     })
    };

    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;
        return (
            <div className="signup">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create an Enlace account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <FormGroupField
                                    placeholder="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    error={errors.username}
                                />
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
                                <FormGroupField
                                    placeholder="Confirm Password"
                                    name="password_confirmation"
                                    type="password"
                                    value={this.state.password_confirmation}
                                    onChange={this.handleInputChange}
                                    error={errors.password_confirmation}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

Signup.propTypes = {
    auth: PropTypes.object.isRequired,
    createUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { createUser })(Signup);