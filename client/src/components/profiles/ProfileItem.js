import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../utils/isEmpty';

import { Row, Col, Card, ListGroup, ListGroupItem } from 'reactstrap';

class ProfileItem extends Component {
    render() {
        const { profile } = this.props;

        return (
            <Card className="card card-body bg-light mb-3">
                <Row>
                    <Col md={2}>
                        <img src={profile.user.avatar} alt="" className="rounded" />
                    </Col>
                    <Col lg={6} md={4} xs={8}>
                        <h3>{profile.user.name}</h3>
                        <h3>{profile.user.name}</h3>
                        <p>
                            {profile.status}{' '}
                            {isEmpty(profile.company) ? null : (
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
                        <h4>Skill Set</h4>
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
