import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../misc/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileUserActions';

import { Container, Row, Col } from 'reactstrap';


class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
            profileItems = <Spinner />;
        } else {
            if (profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ));
            } else {
                profileItems = <h4>No profiles found...</h4>;
            }
        }

        return (
            <div className="profiles">
                <Container>
                    <Row>
                        <Col md={12}>
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            {profileItems}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
