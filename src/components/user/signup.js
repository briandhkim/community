import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getLoggedInUser, signUp} from '../../actions/index';

import axios from 'axios';

class SignUp extends Component {
    
    constructor(props){
        super(props);

        this.props.getLoggedInUser();
    }

    renderSignUpInput({input, id, label, type, required, meta:{asyncValidating, touched, error}}) {
        return(
            <React.Fragment>
                <div className={`input-field col s10 offset-s1 m-8 font-secondary ${asyncValidating ? 'async-validating' : ''}`}>
                    <input {...input} id={id} type={type} required={required} className="white-text border-secondary validate" />
                    <label htmlFor={input.name} className="text-secondary">{label}</label>
                </div>
                <p className="col s12 mt-0 text-error font-tertiary">{touched && error}</p>
            </React.Fragment>
        );
    }

    signUp(values) {
        this.props.signUp(values);
    }

    render() {
        const {handleSubmit, signUpSuccessful, isLoggedIn, signingUp} = this.props;

        if (isLoggedIn) {
            return <Redirect to={{pathname: '/'}} />
        } else if (signUpSuccessful) {
            return <Redirect to={{pathname: '/login'}} />
        } else {
            return (
                <div className="container">
                    <div className="row min-h-400 valign-wrapper">
                        <div className="col m12 l6 offset-l3 mt-5r p-2r bg-primary-dark white-text z-depth-4 center">
                            <h1 className="mt-0 font-primary">Sign up</h1>
                            <form onSubmit={handleSubmit((val)=>{this.signUp(val)})} className="signUpForm">
                                <div className="row">
                                    <Field name='email' id='email' type='email' label='Email' required component={this.renderSignUpInput} />
                                </div>
                                <div className="row">
                                    <Field name='firstName' id='firstName' type='text' label='First Name' required component={this.renderSignUpInput} />
                                </div>
                                <div className="row">
                                    <Field name='lastName' id='lastName' type='text' label='Last Name' required component={this.renderSignUpInput} />
                                </div>
                                <div className="row">
                                    <Field name='password' id='password' type='password' label='Password' required component={this.renderSignUpInput} />
                                </div>
                                <button onClick={handleSubmit((val)=>{this.signUp(val)})} disabled={signingUp} className="font-primary btn-large min-w-200 btn-primary waves-effect waves-light">
                                    Sign up
                                </button>
                                
                                <div className="mt-15">
                                    <Link to="/login" className="font-tertiary btn-small btn-secondary min-w-200 waves-effect waves-light">Log in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

function mapStateToProps(state) {
    const {user, httpRequest} = state;
    return {
        signUpSuccessful    : user.signUpSuccessful,
        isLoggedIn          : user.isLoggedIn,
        user                : user.user,
        signingUp           : httpRequest.signingUp
    };
}

function validate(values) {
    const error = {};
    const {email, firstName, lastName, password} = values;

    // eslint-disable-next-line
    const emailRegex = RegExp("^[A-z0-9._%+-]+@[A-z0-9.-]+\.[a-z]{2,12}$");
    if (!emailRegex.test(email)) {
        error.email = 'Please provide a valid email address';
    }
    if (!email) {
        error.email = 'Please provide your email address';
    }
    if (!firstName) {
        error.firstName = 'Please provide your first name';
    }
    if (!lastName) {
        error.lastName = 'Please provide your last name';
    }
    if (!password) {
        error.password = 'Please provide a password';
    }

    return error;
}

function checkDupEmail(values) {
    const {email} = values;
    if (email && email.length) {
        return axios.get(`/user/check-duplicate-email/${email}`);
    } 
}

const asyncValidate = (values) => {
    //https://redux-form.com/8.3.0/examples/asyncvalidation/
    return checkDupEmail(values)
            .then((res) => {
                const {userExists} = res.data;
                
                if (userExists) {
                    // eslint-disable-next-line
                    throw {email: "This email is already being used."}
                }
            });
}

SignUp = reduxForm({
    form: 'signUp',
    validate,
    asyncValidate,
    asyncBlurFields: ['email']
})(SignUp);

export default connect(mapStateToProps, {getLoggedInUser, signUp})(SignUp);