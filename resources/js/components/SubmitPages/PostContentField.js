import React from 'react';

function PostContentField() {
    if (this.props.highlighted === 'text') {
        return (
            <input
                className="mediumInput"
                type="text"
                onChange={(e) =>
                    this.props.updateContentValue('text', e.currentTarget.value)
                }
                name="postBody"
                placeholder="Text(optional)"
            />
        );
    }
    if (this.props.highlighted === 'media')
        return (
            <input
                className="thinInput"
                style={{
                    width: '90%',
                    marginLeft: '5%',
                    marginRight: '5%',
                }}
                placeholder="Enter image url..."
                onChange={(e) => this.props.setUrl(e.target.value)}
            />
        );
    if (this.props.highlighted === 'link') {
        return (
            <div>
                <input
                    style={{
                        width: '90%',
                        marginLeft: '5%',
                        marginRight: '5%',
                    }}
                    id="postLinkField"
                    type="text"
                    onChange={(e) =>
                        this.props.updateContentValue(
                            'link',
                            e.currentTarget.value
                        )
                    }
                    name="postURL"
                    placeholder="URL"
                />
            </div>
        );
    }
}
export default PostContentField;
