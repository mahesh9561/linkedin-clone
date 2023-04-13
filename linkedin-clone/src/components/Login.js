import React from 'react';
import './CSS/Login.css';
import Nav from './Nav';
import { connect } from "react-redux";
import { signInAPI } from '../actions';
import { Redirect } from 'react-router-dom';

function Login(props) {
  return (
    <>
      {props.user && <Redirect to="/home" />}
      
      <div className="container">
        <Nav />
        <div className='section'>
          <div className='selection_hero'>
            <h1>Welcome to your professional community</h1>
            <img src="./images/login-hero.svg" alt="" />
          </div>
          <div className='form'>
            <div className='google_forms' onClick={() => props.signIn()}>
              <img src="./images/google.svg" alt="" />
              Sign in with Google
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
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
