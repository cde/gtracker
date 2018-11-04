import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup } from 'reactstrap';

const ProfileUserActions = () => {
    return (
        <ButtonGroup className="mb-4" role="group">
            <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-font-awesome text-info mr-1"></i>
                Add Your stack tools
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <i className="fab fa-black-tie text-info mr-1" />
                Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <i className="fas fa-graduation-cap text-info mr-1" />
                Add Education
            </Link>
        </ButtonGroup>
    );
};

export default ProfileUserActions;
