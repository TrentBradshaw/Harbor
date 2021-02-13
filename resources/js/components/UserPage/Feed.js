import React from 'react';
import Status from '../Status/Status';

function Feed({ currentUserId, appendNewStatus, deleteStatus, feedArray }) {
    if (feedArray) {
        return (
            <div id="commentsholder">
                {
                    // feed this an array of posts as well, then mix them, then sort them in chronilogical order
                    feedArray.map((element) => (
                        <Status
                            key={element.id}
                            userId={currentUserId}
                            deleteStatus={deleteStatus}
                            appendNewStatus={appendNewStatus}
                            status={element}
                            form="feed"
                        />
                    ))
                }
            </div>
        );
    }
    return <div />;
}

export default Feed;
