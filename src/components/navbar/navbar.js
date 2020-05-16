import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.hideMobileNav = this.hideMobileNav.bind(this);
    }

    componentDidMount() {
        //https://stackoverflow.com/questions/44506207/reactjs-lifecycle-method-inside-a-function-component
        const elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {});
    }
    hideMobileNav() {
        const elem = document.querySelector(".sidenav");
        const instance = M.Sidenav.getInstance(elem);
        instance.close();
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <div className="nav-wrapper">
                        {
                        // eslint-disable-next-line 
                        }
                        <Link to="/" className="brand-logo font-primary desktop-sm-ml-20" title="Yet Another Messaging Link">YAML</Link>
                        {
                        // eslint-disable-next-line 
                        }
                        <a href="javacript:void(0);" data-target="nav-mobile" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul id="nav-default" className="right hide-on-med-and-down desktop-sm-mr-10">
                            <li className="font-secondary">
                                <Link to="/login" > Log in </Link>
                            </li>
                            <li className="font-secondary"><a href="/">item 2</a></li>
                            <li className="font-secondary"><a href="/">item 3</a></li>
                        </ul>
                    </div>
                </nav>
                <ul className="navbarMobileNav sidenav" id="nav-mobile">
                    <li className="font-secondary">
                        <Link to="/login" onClick={this.hideMobileNav}> Log in </Link>
                    </li>
                    <li className="font-secondary"><a href="/">item 2</a></li>
                    <li className="font-secondary"><a href="/">item 3</a></li>
                </ul>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.user
    };
}

export default connect(mapStateToProps, {})(NavBar);