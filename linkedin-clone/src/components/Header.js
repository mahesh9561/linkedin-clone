import React from 'react'
import './CSS/Header.css'
import { connect } from 'react-redux';
import { signOutAPI } from "../actions"

function Header(props) {
    return (
        <>
            <div className='Container_header'>
                <div className='Content'>
                    {/* Logo */}
                    <div className='Logo'>
                        <a href="./home">
                            <img src="./images/home-logo.svg" alt="" />
                        </a>
                    </div>
                    {/*  */}

                    {/* Search */}
                    <div className='Search'>
                        <div>
                            <input type="text" placeholder='search' />
                        </div>
                        <div className='SearchIcon'>
                            <img src="./images/search-icon.svg" alt="" />
                        </div>
                    </div>
                    {/*  */}
                    {/* NavList Wrap  */}
                    <div className='NavBar'>
                        <div className='NavListWrap '>

                            <div className='NavList '>
                                <a>
                                    <img src="./images/nav-home.svg" alt="" />
                                    <span>Home</span>
                                </a>
                            </div>

                            <div className='NavList '>
                                <a>
                                    <img src="./images/nav-network.svg" alt="" />
                                    <span>My Network</span>
                                </a>
                            </div>

                            <div className='NavList '>
                                <a>
                                    <img src="./images/nav-jobs.svg" alt="" />
                                    <span>Jobs</span>
                                </a>
                            </div>

                            <div className='NavList '>
                                <a>
                                    <img src="./images/nav-messaging.svg" alt="" />
                                    <span>Messaging</span>
                                </a>
                            </div>

                            <div className='NavList '>
                                <a href="">
                                    <img src="./images/nav-notifications.svg" alt="" />
                                    <span>Notiftcations</span>
                                </a>
                            </div>


                            {/*  */}

                            {/* User Profile */}
                            <div className='User'>
                                <a>
                                    {props.user && props.user.photoURL ? (
                                        <img src={props.user.photoURL} />
                                    ) : (
                                        <img src="/images/user.svg" alt="" />
                                    )}
                                    <span>
                                        Me
                                        <img src="/images/down-icon.svg" alt="" />
                                    </span>
                                </a>

                                <div className='SignOut' onClick={() => props.signOut()}>
                                    <a>Sign Out</a>
                                </div>
                            </div>

                            {/* Work Session */}
                            <div className='Work'>
                                <a>
                                    <img src="/images/nav-work.svg" alt="" />
                                    <span>
                                        Work
                                        <img src="/images/down-icon.svg" alt="" />
                                    </span>
                                </a>
                            </div>
                            {/*  */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);