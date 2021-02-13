function MediaPost({ state }) {
    return (
        <div id="1" style={{ display: 'flex' }}>
            <div>
                <img src={state.media_url} alt="media" />
            </div>
        </div>
    );
}
export default MediaPost;
