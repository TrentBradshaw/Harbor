import React from 'react';

function PostFeedObject({ object }) {
    return (
        <div>
            <a href={object.url}>
                {`${object.username} posted ${object.title} in the community of ${object.community} ${object.timeAgo}`}
            </a>
        </div>
    );
}
export default PostFeedObject;
