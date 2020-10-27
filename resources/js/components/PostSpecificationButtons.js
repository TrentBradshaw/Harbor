import React, { Component } from 'react'

import ReactDOM from 'react-dom';

class PostSpecificationButtons extends Component {
    constructor(props) {
        super(props);
    }
    
    onTextbuttonClicked = () => {
        this.props.changePostType('text')
    }
    onMediabuttonClicked = () => {
        this.props.changePostType('media')
    }
    onLinkbuttonClicked = () => {
        this.props.changePostType('link')
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.onTextbuttonClicked}>Text</button>
                <button type="button" onClick={this.onMediabuttonClicked}>Media</button>
                <button type="button" onClick={this.onLinkbuttonClicked}>Link</button>
            </div>
        )
    }
}

export default PostSpecificationButtons
