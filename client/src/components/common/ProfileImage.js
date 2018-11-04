import React, { Component } from 'react';

class ProfileImage extends Component {

    state = {
        user: this.props.user
    }

    render() {
        const user = this.state.user;
        let imageWidth = this.props.width ? this.props.width : '200px';
        return (
            <div>
                <img
                    className="rounded"
                    src={user.avatar}
                    alt={user.username}
                    style={{ width: imageWidth, marginRight: '5px' }}
                    title= "Connect gravatar to your email to display an image"
                />
                <p>@{user.username}</p>
            </div>

        )
    }

}
export default ProfileImage;