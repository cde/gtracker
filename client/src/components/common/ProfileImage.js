import React, { Component } from 'react';

class ProfileImage extends Component {

    state = {
        user: this.props.user
    }

    render() {
        const user = this.state.user;
        return (
            <div>
                <img
                    className="rounded"
                    src={user.avatar}
                    alt={user.username}
                    style={{ width: '200px', marginRight: '5px' }}
                    title= "Connect gravatar to your email to display an image"
                />
                <p>@{user.username}</p>
            </div>

        )
    }

}
export default ProfileImage;