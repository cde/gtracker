import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputIconGroup from "../form/InputIconGroup";
import { addSocialLinks} from "../../actions/profileUserActions";

import { Button } from 'reactstrap';
import {connect} from "react-redux";

class SocialFields extends Component {

    state = {
        twitter: this.props.twitter,
        facebook: this.props.facebook,
        linkedin: this.props.linkedin,
        youtube: this.props.youtube,
        instagram: this.props.instagram,
        errors: {}
    };

    componentDidMount(){
        console.log('componentDidMount', this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        console.log('nextProps in social', nextProps)
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmitSocialLinks = event => {
        event.preventDefault();
        // console.log('socialFields props', this.props)
        console.log('socialFields state', this.state)

        const profileSocialLinks = {
            full_name: this.props.full_name,
            status: this.props.status,
            skills: this.props.skills,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            company: this.state.youtube,
            website: this.state.instagram,
        };

        console.log('profileSocialLinks ' , profileSocialLinks)
        this.props.addSocialLinks(profileSocialLinks, this.props.history);

    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitSocialLinks}>
                    <InputIconGroup
                        placeholder="Twitter URL"
                        name="twitter"
                        icon="fab fa-twitter text-info-light-blue"
                        value={this.state.twitter}
                        onChange={this.handleInputChange}
                        error={this.state.errors.twitter}
                    />
                    <InputIconGroup
                        placeholder="Linkedin URL"
                        name="linkedin"
                        icon="fab fa-linkedin text-info-medium-blue"
                        value={this.state.linkedin}
                        onChange={this.handleInputChange}
                        error={this.state.errors.linkedin}
                    />
                    <InputIconGroup
                        placeholder="Facebook URL"
                        name="facebook"
                        icon="fab fa-facebook text-info-dark-blue"
                        value={this.state.facebook}
                        onChange={this.handleInputChange}
                        error={this.state.errors.facebook}
                    />

                    <InputIconGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube text-danger"
                        value={this.state.youtube}
                        onChange={this.handleInputChange}
                        error={this.state.errors.youtube}
                    />
                    <InputIconGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram text-danger"
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


SocialFields.propTypes = {
    auth: PropTypes.object,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {addSocialLinks})(SocialFields);