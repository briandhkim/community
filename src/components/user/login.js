import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getLoggedInUser, authenticateLogin} from '../../actions/index';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.props.getLoggedInUser();
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    renderLoginInput({input, id, label, type, required, placeholder, meta:{touched, error}}) {

        return(
            <React.Fragment>
                <div className="input-field col s10 offset-s1 m-8 font-secondary">
                    <input {...input} id={id} type={type} required={required} className="white-text border-secondary" />
                    <label htmlFor={input.name} className="text-secondary">{label}</label>
                </div>
                <p className="col s12 mt-0 text-error mb-0 font-tertiary">{touched && error}</p>
            </React.Fragment>
        );
    }

    renderMessageHeader(message, bgType, icon = null) {
        const bg = `bg-${bgType}`;

        return (
            <div className={`col s12 white-text font-secondary text-h6 py-r05 mb-1r ${bg}`}>
                <i className={`material-icons mr-8 align-v ${icon ? "" : " hide"}`}>{icon}</i>
                {message}
            </div>
        );
    }

    login(values) {
        let {email, password} = values;

        if (email === undefined || password === undefined) {
            return;
        }

        this.props.authenticateLogin(values).then(() => {
            if (this._isMounted) {
                this.forceUpdate();
            }
        });
    }

    render() {
        let {handleSubmit, isLoggedIn, loginError, signUpSuccessful} = this.props;

        const messageBanner = signUpSuccessful ? this.renderMessageHeader("Your account has been created", "success", "check_box") : "";

        if (isLoggedIn) {
            return <Redirect to={{pathname: '/'}} />
        } else {
            return (
                <div className="container">
                    <div className="row min-h-400 valign-wrapper">
                        <div className="col s12 m6 offset-m3 mt-5r p-2r bg-primary-dark white-text z-depth-4 center">
                            {messageBanner}
                            <h1 className="mt-0 font-primary">Login</h1>
                            <form onSubmit={handleSubmit((val)=>{this.login(val)})}>
                                <div className="row">
                                    <Field name='email' id="email" component={this.renderLoginInput} type='text' label='Username/Email' required />
                                </div>
                                <div className="row">
                                    <Field name='password' id="password" component={this.renderLoginInput} type='password' label='Password' required />
                                </div>
                                <div className="row">
                                    <p className="text-error col s8 offset-s2 -mt-10"> {loginError} </p>
                                </div>
                                <button onClick={handleSubmit((val)=>{this.login(val)})} className="font-primary btn-large min-w-200 btn-primary waves-effect waves-light">
                                    Login
                                </button>

                                <div className="mt-15">
                                    <Link to="/signup" className="font-tertiary btn-small btn-secondary min-w-200 waves-effect waves-light">Sign up</Link>
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
    return {
        isLoggedIn: state.user.isLoggedIn,
        loginError: state.user.loginError,
        signUpSuccessful: state.user.signUpSuccessful
    };
}

Login = reduxForm({
    form: 'login'
})(Login);

export default connect(mapStateToProps, {getLoggedInUser, authenticateLogin})(Login);