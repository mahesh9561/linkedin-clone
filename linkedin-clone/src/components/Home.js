import React from 'react';
import './CSS/Home.css';
import LeftSide from './LeftSide';
import Main from './Main';
import RightSide from './RightSide';
import Header from './Header';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Home(props) {
    return (
        
        <div className='Container'>
            {/* {!props.user && <Redirect to= '/'/>} */}
            {props.user && <Redirect to= "/" />}
            <div className='Section'>
                <h5>Hiring in a Hurry? - </h5>
                <p>Find talented pros in record time with Upwork and keep business moving</p>
            </div>

            {/* Layout */}
            <div className='Layout'>
                <Header/>
                <LeftSide />
                <Main />
                <RightSide />
            </div>
            {/* {!props.user && <Redirect to= '/'/>} */}
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,// Update to access the 'user' property from Redux state
    };
};


export default connect(mapStateToProps)(Home);
