import React, {Component} from 'react';
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
                <div className="input-field col s10 m-8">
                    <input {...input} id={id} type={type} required={required} className="" />
                    <label htmlFor={input.name}>{label}</label>
                </div>
                <p className="col s12 mt-0 text-error mb-0">{touched && error}</p>
            </React.Fragment>
        );
    }

    login(values) {
        this.props.authenticateLogin(values).then(() => {
            if (this._isMounted) {
                this.forceUpdate();
            }
        });
    }

    render() {
        let {handleSubmit, user, isLoggedIn, loginError} = this.props;

        if (isLoggedIn) {
            return <Redirect to={{pathname: '/'}} />
        } else {
            return (
                <div className="container">
                    <div className="row min-h-400 valign-wrapper">
                        <div className="col s12 m6 offset-m3">
                            <h1>Login</h1>
                            <form onSubmit={handleSubmit((val)=>{this.login(val)})}>
                                <div className="row">
                                    <Field name='email' id="email" component={this.renderLoginInput} type='text' label='Username/Email' required />
                                </div>
                                <div className="row">
                                    <Field name='password' id="password" component={this.renderLoginInput} type='password' label='Password' required />
                                </div>
                                <div className="row">
                                    <p className="text-error col s8 -mt-10"> {loginError} </p>
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
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user,
        loginError: state.user.loginError
    };
}

Login = reduxForm({
    form: 'login'
})(Login);

export default connect(mapStateToProps, {getLoggedInUser, authenticateLogin})(Login);