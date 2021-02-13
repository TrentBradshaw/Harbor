import VotingSystem from './VotingSystem';
import Moment from '../Utility/Moment';
// don't forget to pass the votes into the voting system component

function LinkedPost({ state }) {
    return (
        <div id="1" style={{ display: 'flex' }}>
            <VotingSystem id={state.id} type="post" />
            {state.grabbedData.imageAndTitleFound ? (
                <div id="2" style={{ display: 'flex' }}>
                    <img
                        style={{ height: '100px', width: '150px' }}
                        src={state.grabbedData.img}
                        alt="ArticleImg"
                    />
                    <div>
                        <h2 style={{ height: '45%' }}>
                            {state.grabbedData.title}
                        </h2>
                        <div style={{ display: 'flex', marginTop: '15px' }}>
                            <Moment
                                creator={state.creatorUsername}
                                timePosted={state.formattedStamp}
                            />
                            <p>x commments</p>
                            <p>share</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>metadata not found</h1>
                </div>
            )}
        </div>
    );
}
export default LinkedPost;
