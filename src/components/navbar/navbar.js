import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
class NavBar extends Component {
    
    componentDidMount() {
        //https://stackoverflow.com/questions/44506207/reactjs-lifecycle-method-inside-a-function-component
        const elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {});
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <div className="nav-wrapper">
                        {
                        // eslint-disable-next-line 
                        }
                        <a href="javacript:void(0);" className="brand-logo font-primary desktop-sm-ml-20" title="Yet Another Messaging Link">YAML</a>
                        {
                        // eslint-disable-next-line 
                        }
                        <a href="javacript:void(0);" data-target="nav-mobile" className="sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul id="nav-default" className="right hide-on-med-and-down desktop-sm-mr-10">
                            <li className="font-secondary"><a href="/">item 1</a></li>
                            <li className="font-secondary"><a href="/">item 2</a></li>
                            <li className="font-secondary"><a href="/">item 3</a></li>
                        </ul>
                    </div>
                </nav>
                <ul className="navbarMobileNav sidenav" id="nav-mobile">
                    <li className="font-secondary"><a href="/">item 1</a></li>
                    <li className="font-secondary"><a href="/">item 2</a></li>
                    <li className="font-secondary"><a href="/">item 3</a></li>
                </ul>
            </React.Fragment>
        );
    }
}

export default NavBar;