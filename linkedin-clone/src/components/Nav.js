import React from 'react'
// import './Nav.css'
import './CSS/Nav.css';

function Nav() {
    return (
        <div className='Nav_header'>
            <div className='Nav'>
                <a href="">
                    <img className='Nav_img' src="/images/login-logo.svg" alt="" />
                </a>
                
                <div style={{ display: 'flex' }}>
                    <div className='btn_join'>
                        Join now
                    </div>
                    <div className='btn_Signin'>
                        Sign in
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nav
