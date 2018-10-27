import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {

    logoutClick = event => {
        event.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="" onClick={this.logoutClick} className="nav-link">
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.username}
                            style={{ width: '25px', marginRight: '5px' }}
                            title= "Connect gravatar to your email to display an image"
                        />{' '}
                        Log out</a>

                </li>
            </ul>
        );

        const generalLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'>Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Enlaces
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/profiles'>
                                    {' '}
                                    Coders
                                </Link>
                            </li>
                        </ul>
                        { isAuthenticated ? authLinks : generalLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
