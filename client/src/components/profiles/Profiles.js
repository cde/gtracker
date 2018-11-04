import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from "../common/Breadcrumbs";
import Spinner from '../misc/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileUserActions';


import { Container, Row, Col } from 'reactstrap';

class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
        console.log(this.props)
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
                    <Breadcrumbs goBack="Go Back" current="Profiles" />
                    <Row>
                        <Col md={12}>
                            <h3 className="display-5 text-center dark-medium-orange">Checkout some profiles</h3>
                        </Col>
                        {profileItems}
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