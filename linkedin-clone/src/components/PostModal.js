import React, { useState } from 'react'
import './CSS/PostModal.css'
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { postArticleAPI } from '../actions';
import {getArticleAPI} from '../actions';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // <-- Add this line


function PostModal(props) {
    const [editorText, seteditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (image == '' || image === undefined) {
            alert(`not an image, the field is a ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    const postArticle = (e) => {
        console.log("Post malon");
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            console.log("hello");
            return;
        }
        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        };
        props.postArticle(payload);
        reset(e);
    };

    const reset = (e) => {
        seteditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };
    return (
        <>
            {props.showmodal === 'open' &&
                <div className='Container1'>
                    <div className='Content1'>
                        <div className='Header1'>
                            <h2>Create a post</h2>
                            <button onClick={(e) => reset(e)}>
                                <img src="./images/close.svg" alt="" />
                            </button>
                        </div>
                        <div className='SharedContent1'>
                            <div className='UserInfo1'>
                                {props.user.photoURL ? (<img src={props.user.photoURL} />
                                ) : (
                                    <img src="/images/user.svg" alt="" />

                                )}
                                <span>{props.user.displayName}</span>
                            </div>

                            <div className="Edditor">
                                <textarea value={editorText}
                                    onChange={(e) => seteditorText(e.target.value)}
                                    placeholder='What do you want to talk about?'
                                    autoFocus={true}
                                />



                                {/* Upload Photo */}
                                {assetArea === 'image' ? (
                                    <div className="UploadImage">
                                        <input type="file" accept='image/gif, image/jpeg, image/png'
                                            name='image' id='file'
                                            style={{ display: "none" }}
                                            onChange={handleChange} />

                                        <p>
                                            <label htmlFor="file" style={{}}>Select an image to share</label>
                                        </p>
                                        {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                                    </div>
                                ) : (
                                    assetArea === 'media' && (
                                        // Upload Video
                                        <>
                                            <input type='text'
                                                placeholder='Please input video link' value={videoLink}
                                                onChange={(e) => setVideoLink(e.target.value)}
                                            />
                                            {videoLink && <ReactPlayer width={'100%'} url={videoLink} />}
                                        </>
                                    )
                                )}
                            </div>

                            <div className='shareCreation'>
                                <div className='AttatchAssets'>
                                    <div className='AssetButton'>
                                        <button onClick={() => switchAssetArea("image")}>
                                            <img src="./images/photo-icon.svg" alt="" />
                                        </button>
                                    </div>
                                    <div className='AssetButton'>
                                        <button onClick={() => switchAssetArea("media")}>
                                            <img src="./images/video-icon.svg" alt="" />
                                        </button>
                                    </div>
                                </div>


                                <div className="ShareComments">
                                    <div className="AssetButton">
                                        <button>
                                            <img src="./images/talk-bubble-icon.svg" alt="" />
                                            Anyone
                                        </button>
                                    </div>
                                </div>

                                <button className="PostButton" disabled={!editorText ? true : false}
                                    onClick={(event) => postArticle(event)}
                                >
                                    Post
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
