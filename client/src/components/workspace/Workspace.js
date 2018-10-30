import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount} from "../../actions/profileUserActions";

import PropTypes from 'prop-types';

import Spinner from '../misc/Spinner';

import { Container, Row, Col, Button } from 'reactstrap';
import ProfileUserActions from "./ProfileUserActions";

class Workspace extends Component {

    componentDidMount(){
        this.props.getCurrentProfile()
    }

    onDeleteClick = (event) => {
        this.props.deleteAccount();
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
                        <p className="lead text-muted"> Welcome
                            <Link to={`/profile/${profile.username}`}> {profile.fullName}</Link>
                        </p>
                        <ProfileUserActions/>
                        <div>
                            <Button
                                className='btn-danger'
                                onClick={this.onDeleteClick}>Delete My Account </Button>
                        </div>
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
                <Container>
                    <Row>
                        <Col md={12}>
                            <h3 className="display-4">
                                <i className="fas fa-warehouse "></i>
                            </h3>
                            {workspaceContent}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Workspace.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Workspace);