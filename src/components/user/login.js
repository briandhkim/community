import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getUser, authenticateLogin} from '../../actions/index';

class Login extends Component {

    componentDidMount() {
        // this.props.getUser();
    }

    renderLoginInput({input, id, label, type, placeholder, meta:{touched, error}}) {
        // console.log(touched,error);

        return(
            <React.Fragment>
                <div className="input-field col s10 m-8">
                    <input {...input} id={id} type={type} className="validate" />
                    <label htmlFor={input.name}>{label}</label>
                </div>
                <p className="col s12 mt-0 text-error">{touched && error}</p>
            </React.Fragment>
        );
    }

    login(values) {
        console.log("in login fuc", values);
        
        this.props.authenticateLogin(values);
    }

    render() {
        const {handleSubmit, user} = this.props;

        return (
            <div className="container">
                <div className="row min-h-400 valign-wrapper">
                    <div className="col s12 m6 offset-m3">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit((val)=>{this.login(val)})}>
                            <div className="row">
                                <Field name='email' id="email" component={this.renderLoginInput} type='text' label='Username/Email' />
                            </div>
                            <div className="row">
                                <Field name='password' id="password" component={this.renderLoginInput} type='password' label='Password' />
                            </div>
                            <div className="row">
                                <p>{/* login error message section */}</p>
                            </div>
                            <button onClick={handleSubmit((val)=>{this.login(val)})} className="btn-large min-w-200 btn-primary waves-effect waves-light">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

function validation(values) {
    const error = {};

    if (!values.email) {
        error.email = 'Please provide a username or an email';
    }
    if (!values.password) {
        error.password = 'Please provide a password';
    }
    return error;
}

Login = reduxForm({
    form: 'login',
    validate: validation
})(Login);

export default connect(mapStateToProps, {getUser, authenticateLogin})(Login);