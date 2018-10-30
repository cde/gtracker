import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

import InputIconGroup from "../form/InputIconGroup";

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

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default SocialFields;