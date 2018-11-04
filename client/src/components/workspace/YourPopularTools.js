import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col} from 'reactstrap';

class YourPopularTools extends Component {
    render() {
        console.log( this.props.tools);
        const popularTools = this.props.tools.map(tool => (
            <div className="popular-tools" key={tool._id}>
                <a title={tool.name} className="popular-tools tool">
                    <img src={tool.image} className="link-image logo" alt={tool.name} />
                </a>
            </div>
        ));

        return (
            <Container className="mb-5 mt-2">
                <h5 className="mb-4"> <i className="fab fa-font-awesome text-info mr-1" />Your Favorite Tools</h5>
                <Row>
                    <Col md={6} className="d-flex flex-row ">
                        {popularTools}
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default connect(null, {})(YourPopularTools);
