import React from 'react'
import './CSS/LeftSide.css'
import { connect } from 'react-redux';

function LeftSide(props) {
    return (
        <div className='Container'>
            <div className='ArtCard'>
                <div className='UserInfo'>
                    <div className='CardBackground' />
                    <a>
                        <div className='Photo' />
                        <div className='Link'>Welcome, {props.user ? props.user.displayName : "there"}</div>
                    </a>
                    <a>
                        <div className='AddPhotoText'>
                            Add a Photo
                        </div>
                    </a>
                </div>

                <div className='Widget'>
                    <a>
                        <div className='saperate'>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <img src="./images/widget-icon.svg" alt="" />
                    </a>
                </div>
                <div className='Item'>
                    <span>
                        <img src="./images/item-icon.svg" alt="" />
                        My Items
                    </span>
                </div>
            </div>

            <div className='CommunityCard'>
                <a>
                    <span>Groups</span>
                </a>
                <a>
                    <span>
                        Events
                        <img src="./images/plus-icon.svg" alt="" />
                    </span>
                </a>
                <a>
                    <span>Follow Hashtags</span>
                </a>
                <a><span>Discover more</span></a>
            </div>

        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        user:state.userState.user,
    };
};

export default connect(mapStateToProps)(LeftSide)