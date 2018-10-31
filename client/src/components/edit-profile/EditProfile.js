import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// import SocialFields from './SocialFields';

import { createProfile, getCurrentProfile } from "../../actions/profileUserActions";


import { Row, Col, Button } from 'reactstrap';

import professionalStatus from "../common/professionalStatus";
import SelectListGroup from "../form/SelectListGroup";
import FormGroupField from './../form/FormGroupField';
import FormGroupTextAreaField from "../form/FormGroupTextAreaField";
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


    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
            console.log(this.state.errors);
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
            status: this.state.status,
            company: this.state.company,
            website: this.state.website,
            skills: this.state.skills
        };
        console.log(profile);
        this.props.createProfile(profile, this.props.history);

    };

    onClickSocialFields =(event)=> {
        this.setState(prevState => ({
            displaySocialFields: !prevState.displaySocialFields
        }));
    }

    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;
        // console.log(user);
        // let socialFields;
        // if(displaySocialFields){
        //     socialFields =  (<SocialFields
        //         errors = {errors}
        //         // twitter = {this.state.twitter}
        //     />)
        //
        // }
        return (
            <div>
                <div className="container">
                    <Row>
                        <Col md={12}>
                            <h1 className="display-6 text-md-center">Edit Profile</h1>
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
                                <Button className='btn-light' onClick={this.onClickSocialFields}>
                                    <i className="fas fab fa-twitter text-info mr-1" />
                                    Add Social Links
                                </Button>
                                <span className="text-muted"> .. Optional</span>
                            </div>
                            {/*{socialFields}*/}

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
                                <FormGroupField
                                    type="text"
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.handleInputChange}
                                    error={errors.githubusername}
                                    info="Github link, including your username"
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
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(withRouter(EditProfile));
