import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount} from "../../actions/profileUserActions";

import PropTypes from 'prop-types';

import Spinner from '../misc/Spinner';

import { Container, Row, Col, ButtonGroup, Button } from 'reactstrap';
import ProfileUserActions from "./ProfileUserActions";
import Experiences from "./Experiences";

class Workspace extends Component {

    componentDidMount(){
        this.props.getCurrentProfile()
    }

    onDeleteClick = (event) => {
        this.props.deleteAccount();
    };

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
                        <p className="lead text-muted"> Welcome &nbsp;
                            <Link className="dark-medium-orange" to={`/profile/${profile.username}`}> {profile.fullName}</Link>
                        </p>
                        <ProfileUserActions/>
                        <Experiences experiences={profile.experience }/>
                        <ButtonGroup className="mb-4" role="group" style={{ float: 'left', paddingLeft: '10px' }}>
                            <Button onClick={this.onDeleteClick}className="btn btn-danger">
                                <i className="fas fa-user-times"></i> Delete My Account
                            </Button>
                        </ButtonGroup>
                    </div>

                    )
            }else {
                workspaceContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.username}</p>
                        <p> You haven't setup a profile yet. We would love to know you better. Please add some info.</p>

                        <Link to="/create-profile" className="btn btn-lg btn-info-orange">Create Profile</Link>
                    </div>
                )
            }
        }
        return(
            <Container className="workspace">
                <Row>
                    <Col md={12}>
                        <span className="display-4">
                            <i className="fas fa-warehouse text-info"></i>
                        </span>
                        {workspaceContent}
                    </Col>
                </Row>
            </Container>
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