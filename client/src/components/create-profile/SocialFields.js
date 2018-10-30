import React, { Component } from 'react';

import InputIconGroup from "../form/InputIconGroup";
import { createProfile} from "../../actions/profileUserActions";

import { Button } from 'reactstrap';
import {connect} from "react-redux";

class SocialFields extends Component {

    state = {
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    };

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

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <InputIconGroup
                        placeholder="Twitter URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.handleInputChange}
                        error={this.state.errors.twitter}
                    />
                    <InputIconGroup
                        placeholder="Facebook URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.handleInputChange}
                        error={this.state.errors.facebook}
                    />
                    <InputIconGroup
                        placeholder="Linkedin URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.handleInputChange}
                        error={this.state.errors.linkedin}
                    />
                    <InputIconGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.handleInputChange}
                        error={this.state.errors.youtube}
                    />
                    <InputIconGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.handleInputChange}
                        error={this.state.errors.instagram}
                    />
                    <Button>save</Button>
                </form>
            </div>
        );
    }
}


// CreateProfile.propTypes = {
//     auth: PropTypes.object,
//     profile: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(SocialFields);
// export default SocialFields;