import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileUserActions';


import { Container, Table,  Button } from 'reactstrap';

class Experiences extends Component {
    onDeleteExperience(id) {
        console.log(id)
        this.props.deleteExperience(id);
    }

    render() {
        const experience = this.props.experiences.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (
                        ' Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    )}
                </td>
                <td>
                    <Button
                        onClick={this.onDeleteExperience.bind(this,exp._id)}
                        className="btn btn-danger btn-sm "
                    >
                        <i className="fas fa-minus"></i>
                    </Button>
                </td>
                <td>{exp._id}</td>
            </tr>
        ));
        return (
            <Container>
                <h5 className="mb-4"> <i className="fab fa-black-tie text-info mr-1" />Experience</h5>
                <Table >
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th>ID</th>
                        <th />
                    </tr>
                    {experience}
                    </thead>
                </Table>
            </Container>
        );
    }
}

Experiences.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experiences);
