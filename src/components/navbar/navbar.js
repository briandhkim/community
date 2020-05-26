import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min';

import {logOut, resetSocialReducerData} from '../../actions/index';

import GuestNavbarCollection from './guestNavbarCollection';
import MobileGuestNavbarCollection from './mobileGuestNavbarCollection';
import UserNavbarColleciton from './userNavbarCollection';
import MobileUserNavbarCollection from './mobileUserNavbarCollection';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.hideMobileNav = this.hideMobileNav.bind(this);
        this.logOutHandler = this.logOutHandler.bind(this);
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

    logOutHandler() {
        console.log("xxx")
        this.props.resetSocialReducerData();
        this.props.logOut();
    }

    render() {
        const {isLoggedIn, user} = this.props;

        let navbarCollection;
        let mobileNavbarCollection;
        if (isLoggedIn) {
            navbarCollection = <UserNavbarColleciton user={user} logOut={this.logOutHandler} />
            mobileNavbarCollection = <MobileUserNavbarCollection user={user} logOut={this.logOutHandler} hideMobileNav={this.hideMobileNav} />
        } else {
            navbarCollection = <GuestNavbarCollection />
            mobileNavbarCollection = <MobileGuestNavbarCollection hideMobileNav={this.hideMobileNav} />
        }

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
                            {navbarCollection}
                        </ul>
                    </div>
                </nav>
                <ul className="navbarMobileNav sidenav" id="nav-mobile">
                    {mobileNavbarCollection}
                </ul>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state;
    return {
        isLoggedIn: user.isLoggedIn,
        user: user.user
    };
}

export default connect(mapStateToProps, {logOut, resetSocialReducerData})(NavBar);