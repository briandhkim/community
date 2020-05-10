import React from 'react';
import {Link} from 'react-router-dom';

const GuestLanding = (props) => {
    return (
        <div className="container">
            <div className="row min-h-400 valign-wrapper">
                <div className="col s12 m8 offset-m2 center-align">
                    <div className="mb-20">
                        {// eslint-disable-next-line 
                        }
                        <Link to="/login" className="btn-large min-w-200 btn-primary waves-effect waves-light">Log in</Link>
                    </div>
                    <div className="">
                        {// eslint-disable-next-line 
                        }
                        <Link to="/signup" className="btn-large min-w-200 btn-primary waves-effect waves-light">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GuestLanding;