import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile} from "../../actions/profileUserActions";

import PropTypes from 'prop-types';

import Spinner from '../misc/Spinner';

import { Row, Col } from 'reactstrap';
import ProfileUserActions from "./ProfileUserActions";

class Workspace extends Component {

    componentDidMount(){
        this.props.getCurrentProfile()

    }
    render() {
        const { user } = this.props.auth;
        const { loading, profile } = this.props.profile;

        let workspaceContent;
        if(profile === null || loading){
            workspaceContent = <Spinner/>
        }else{
            if(Object.keys(profile).length > 0 ) {
                workspaceContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.username}`}>{profile.fullName}</Link>
                        </p>
                        <ProfileUserActions/>

                    </div>

                    )
            }else {
                workspaceContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.username}</p>
                        <p> You haven't setup a profile yet. We would love to know you better. Please add some info.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info ">Create Profile</Link>
                    </div>
                )
            }
        }
        return(
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <h1 className="display-4">Workspace</h1>
                            {workspaceContent}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

Workspace.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Workspace);