import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import SocialFields from './SocialFields';


import { Row, Col, Button } from 'reactstrap';
import FormGroupField from './../form/FormGroupField';
import SelectListGroup from "../form/SelectListGroup";

import professionalStatus from "./professionalStatus";
import FormGroupTextAreaField from "../form/FormGroupTextAreaField";

import { createProfile} from "../../actions/profileUserActions";

class CreateProfile extends Component {
    state = {
        displaySocialFields: false,
        username: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const profile = {
            username: this.state.username,
            full_name: this.state.full_name,
            status: this.state.status,
            company: this.state.company,
            website: this.state.website,
            skills: this.state.skills
        };
        console.log(profile);
        this.props.createProfile(profile, this.props.history);

    };

    onClickSocialFields = event => {
        console.log('before ', this.state.displaySocialFields);
        this.setState(prevState => ({
            displaySocialFields: !prevState.displaySocialFields
        }));
        console.log('before ', this.state.displaySocialFields);
    }

    render() {
        const { errors, displaySocialFields } = this.state;
        const { user } = this.props.auth;

        let socialFields;
        if(displaySocialFields){
            socialFields =  (<SocialFields
                errors = {errors}
                // twitter = {this.state.twitter}
            />)

        }
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <h1 className="display-6 text-md-center">Complete your Profile</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <img
                                className="rounded"
                                src={user.avatar}
                                alt={user.username}
                                style={{ width: '200px', marginRight: '5px' }}
                                title= "Connect gravatar to your email to display an image"
                            />
                            <p>{user.username}</p>

                            <div className="mb-3">
                                <Button onClick={this.onClickSocialFields}>
                                    Add Social Links
                                </Button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialFields}

                        </Col>
                        <Col md={7}>
                            <form onSubmit={this.onSubmit}>
                                <FormGroupField
                                    label="Full Name"
                                    placeholder="Full Name"
                                    name="full_name"
                                    value={this.state.full_name}
                                    onChange={this.handleInputChange}
                                    error={errors.full_name}
                                    info="Please provide your full name (First and Last Name)"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.handleInputChange}
                                    options={professionalStatus}
                                    error={errors.status}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <FormGroupField
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.handleInputChange}
                                    error={errors.company}
                                    info="Could be the one you work for or your own company"
                                />
                                <FormGroupField
                                    placeholder="Website"
                                    name="website"
                                    type="text"
                                    value={this.state.website}
                                    onChange={this.handleInputChange}
                                    error={errors.website}
                                    info="Could be your own website"
                                />
                                <FormGroupField
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.handleInputChange}
                                    error={errors.githubusername}
                                    info="Github link, including your username"
                                />
                                <FormGroupField
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.handleInputChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,Ruby)"
                                />
                                <FormGroupTextAreaField
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.handleInputChange}
                                    error={errors.bio}
                                    info="Tell us more about yourself"
                                />
                                <Button>Submit</Button>
                            </form>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(CreateProfile);
