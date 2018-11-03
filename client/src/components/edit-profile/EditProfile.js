import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

//Common components
import SocialFields from '../common/SocialFields';
import ProfileImage from '../common/ProfileImage';
import professionalStatus from "../common/professionalStatus";
import SelectListGroup from "../form/SelectListGroup";
import FormGroupField from './../form/FormGroupField';
import FormGroupTextAreaField from "../form/FormGroupTextAreaField";
import InputIconGroup from "../form/InputIconGroup";
import Breadcrumbs from "../common/Breadcrumbs";

import { Container, Row, Col, Button, FormGroup } from 'reactstrap';

import { createProfile, getCurrentProfile, clearErrors } from "../../actions/profileUserActions";

import isEmpty from "../../utils/isEmpty";

class EditProfile extends Component {
    state = {
        displaySocialFields: false,
        full_name: '',
        company: '',
        website: '',
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

    componentDidMount(){
        this.props.getCurrentProfile();
        if(this.props.errors){
            this.props.clearErrors();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            profile.fullName = !isEmpty(profile.fullName) ? profile.fullName : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';

            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.githubusername = !isEmpty(profile.githubusername)
                ? profile.githubusername
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';

            const skillsCSV = profile.skills.join(',');


            // Set component fields state
            this.setState({
                full_name: profile.fullName,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
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
            full_name: this.state.full_name,
            skills: this.state.skills,
            status: this.state.status,
            company: this.state.company,
            location: this.state.location,
            website: this.state.website
        };
        this.props.createProfile(profile, this.props.history);

    };

    onClickSocialFields =(event)=> {
        this.setState(prevState => ({
            displaySocialFields: !prevState.displaySocialFields
        }));
    }

    render() {
        const { errors, displaySocialFields } = this.state;
        const { user } = this.props.auth;
        let socialFields;
        if(displaySocialFields){
            socialFields =  (<SocialFields
                full_name = {this.state.full_name}
                skills = {this.state.skills}
                status = {this.state.status}
                twitter = {this.state.twitter}
                facebook = {this.state.facebook}
                linkedin = {this.state.linkedin}
                instagram = {this.state.instagram}
                errors = {errors}
            />)

        }
        return (
            <Container className="profile">
                <Breadcrumbs goBack="Go Back" current="Edit Profile" />
                <Row>
                    <Col md={12}>
                        <h1 className="display-5 text-center dark-medium-orange">Edit Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <ProfileImage user={user} />
                        <div className="mb-3">
                            <Button className='btn-light' onClick={this.onClickSocialFields}>
                                <i className="fas fab fa-twitter text-info-light-blue mr-1" />
                                <i className="fas fab fa-linkedin text-info-medium-blue mr-1" />
                                <i className="fas fab fa-instagram text-danger mr-1" />
                                <i className="fas fab fa-facebook-square text-info-dark-blue mr-1" />
                            </Button>
                            <small className="text-muted"> .. Optional</small>
                        </div>
                        {socialFields}

                    </Col>
                    <Col md={6}>
                        <form onSubmit={this.onSubmit}>
                            <FormGroupField
                                label="Full Name"
                                placeholder="Name *"
                                name="full_name"
                                value={this.state.full_name}
                                onChange={this.handleInputChange}
                                error={errors.full_name}
                                info="Please provide your full name (First and Last Name)"
                            />
                            <FormGroupField
                                type="text"
                                placeholder="* Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.handleInputChange}
                                error={errors.skills}
                                info="Please use comma separated values (eg. HTML,CSS,JavaScript,Ruby)"
                            />

                            <SelectListGroup
                                type="text"
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.handleInputChange}
                                options={professionalStatus}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />
                            <FormGroupField
                                type="text"
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
                            <FormGroup className="mt-4">
                                <InputIconGroup
                                    type="text"
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.handleInputChange}
                                    error={errors.githubusername}
                                    info="Github link, including your username"
                                    icon="fab fa-github"
                                />
                            </FormGroup>

                            <FormGroupTextAreaField
                                name="bio"
                                value={this.state.bio}
                                onChange={this.handleInputChange}
                                error={errors.bio}
                                info="Tell us more about yourself"
                            />
                            <Button type="submit" className="btn btn-lg btn-info-orange btn-block mt-4">Submit</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

EditProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile, clearErrors })(withRouter(EditProfile));
