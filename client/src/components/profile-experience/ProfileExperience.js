import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button } from 'reactstrap';

import FormGroupField from './../form/FormGroupField';
import FormGroupTextAreaField from "../form/FormGroupTextAreaField";
import Breadcrumbs from "../common/Breadcrumbs";


import { addExperience } from '../../actions/profileUserActions';

class ProfileExperience extends Component {
    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit =(e) => {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.addExperience(expData, this.props.history);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onCheck =(e)=> {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    }

    render() {
        const { errors } = this.state;

        return (
            <Container className="profile add-experience" >
                <Breadcrumbs goBack="Go Back" current="Add Experience" />

                <Row>
                    <Col md={8} className="m-auto">

                        <h1 className="display-5 text-center dark-medium-orange">Share with us your Experience</h1>
                        <div className="lead text-center text-muted">
                            Add any job or position that you have had in the past or current
                        </div>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <FormGroupField
                                placeholder="* Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.handleInputChange}
                                error={errors.company}
                            />
                            <FormGroupField
                                placeholder="* Job Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                error={errors.title}
                            />
                            <FormGroupField
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleInputChange}
                                error={errors.location}
                                info="Tell us where your experience is located"
                            />
                            <Row className="date-range mt-3">
                                <Col>
                                    <FormGroupField
                                        label="From date"
                                        name="from"
                                        type="date"
                                        value={this.state.from}
                                        onChange={this.handleInputChange}
                                        error={errors.from}
                                    />
                                </Col>
                                <Col>
                                    <FormGroupField
                                        label="To date"
                                        name="to"
                                        type="date"
                                        value={this.state.to}
                                        onChange={this.handleInputChange}
                                        error={errors.to}
                                        disabled={this.state.disabled ? 'disabled' : ''}
                                    />
                                </Col>

                            </Row>
                            <div className="form-check mb-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                />
                                <label htmlFor="current" className="form-check-label">
                                    Current Job
                                </label>
                            </div>
                            <FormGroupTextAreaField
                                placeholder="Job Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                error={errors.description}
                                info="Tell us about the the position"
                            />
                            <Button type="submit" className="btn btn-lg btn-info-orange btn-block mt-4">Submit</Button>
                            {/*<input*/}
                                {/*type="submit"*/}
                                {/*value="Submit"*/}
                                {/*className="btn btn-info btn-block mt-4"*/}
                            {/*/>*/}
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ProfileExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
    withRouter(ProfileExperience)
);
