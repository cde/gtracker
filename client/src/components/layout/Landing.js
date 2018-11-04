import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { Container, Row, Col } from 'reactstrap';
// import Feature from './Feature'

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/workspace')
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <Container>
                        <Row>
                            <Col md={12} className="text-center">
                                <div className="enlace">
                                    <h1 className="display-3 mb-4">Coders Enlace</h1>
                                    <p className="lead ">
                                        {' '}
                                        Create a developer profile/portfolio, share posts, your favorite tech stack and
                                        events.
                                        <br/>
                                        Get a personalized feed of the latest news for your tech stack
                                    </p>
                                </div>
                                <hr/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
