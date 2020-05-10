import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getLoggedInUser, signUp} from '../../actions/index';

import axios from 'axios';

class SignUp extends Component {
    // componentWillMount() {
    //     this.props.getLoggedInUser();
    // }

    renderSignUpInput({input, id, label, type, required, meta:{asyncValidating, touched, error}}) {
        return(
            <React.Fragment>
                <div className={`input-field col s10 m-8 ${asyncValidating ? 'async-validating' : ''}`}>
                    <input {...input} id={id} type={type} required={required} className="white-text border-secondary validate" />
                    <label htmlFor={input.name} className="text-secondary">{label}</label>
                </div>
                <p className="col s12 mt-0 text-error">{touched && error}</p>
            </React.Fragment>
        );
    }

    signUp(values) {
        this.props.signUp(values);
    }

    render() {
        const {handleSubmit, signUpSuccessful} = this.props;

        if (signUpSuccessful) {
            return <Redirect to={{pathname: '/login'}} />
        } else {
            return (
                <div className="container">
                    <div className="row min-h-400 valign-wrapper">
                        <div className="col s12 m6 offset-m3 mt-5r p-2r bg-primary-dark white-text">
                            <h1 className="mt-0">Sign up</h1>
                            <form onSubmit={handleSubmit((val)=>{this.signUp(val)})}>
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
                                <div className="row"></div>
                                <button onClick={handleSubmit((val)=>{this.signUp(val)})} className="btn-large min-w-200 btn-primary waves-effect waves-light">
                                    Sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

function mapStateToProps(state) {
    return {
        signUpSuccessful: state.user.signUpSuccessful,
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user
    };
}

function validate(values) {
    const error = {};
    const {email, firstName, lastName, password} = values;

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
        return axios.get(`/check-duplicate-email/${email}`);
    } 
}

const asyncValidate = (values) => {
    //https://redux-form.com/8.3.0/examples/asyncvalidation/
    return checkDupEmail(values).then((res) => {
        const {userExists} = res.data;
        if (userExists) {
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