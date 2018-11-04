import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

import ProfileImage from '../common/ProfileImage';

import { Row, Col, Card, ListGroup, ListGroupItem } from 'reactstrap';

class ProfileItem extends Component {
    render() {
        const { profile } = this.props;

        return (
            <Card className="card card-body bg-light mb-3 mr-sm-1">
                <Row>
                    <Col md={3}>
                        <ProfileImage user={profile.user} width="100%" />
                    </Col>
                    <Col lg={5} md={3} xs={7}>
                        <h5>{profile.fullName}</h5>
                        <p>
                            {profile.status}{' '}
                            {isEmpty(profile.company) ? '' : (
                                <span>at {profile.company}</span>
                            )}
                        </p>
                        <p>
                            {isEmpty(profile.location) ? null : (
                                <span>{profile.location}</span>
                            )}
                        </p>
                        <Link to={`/profile/${profile.handle}`} className="btn btn-info">
                            View Profile
                        </Link>
                    </Col>
                    <Col md={4} className="d-none d-md-block">
                        <h5 className="text-info">Skill Set</h5>
                        <ListGroup>
                            {profile.skills.slice(0, 4).map((skill, index) => (
                                <ListGroupItem key={index}>
                                    <i className="fa fa-check pr-1" />
                                    {skill}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Card>
        );
    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
