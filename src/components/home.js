import React, {Component} from 'react';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row min-h-400 valign-wrapper">
                    <div className="col s12 m8 offset-m2 center-align">
                        <div className="mb-20">
                            {
                            // eslint-disable-next-line 
                            }<a href="#!" className="btn-large min-w-200 btn-primary waves-effect waves-light">Login</a>
                        </div>
                        <div className="">
                            {// eslint-disable-next-line 
                            }<a href="#!" className="btn-large min-w-200 btn-primary waves-effect waves-light">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;