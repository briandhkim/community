import React, {Component} from 'react';
import {connect} from 'react-redux';

import M from 'materialize-css/dist/js/materialize.min';

import MaterialIcon from '../util/materialIcon';

class SearchPeopleResult extends Component {

    componentDidUpdate() {
        const elem = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elem, {margin: 1});
    }

    renderResultList() {
        const {user, friends, searchResultUsers} = this.props;

        const list = searchResultUsers.map((su, idx) => {
            let secondary = <a href="#!" className="secondary-content tooltipped" data-position="left" data-tooltip="Add friend" >
                                <MaterialIcon icon={"person_add"} styleClass={""} />
                            </a>;

            if (friends[su.uid]) {
                secondary = <span className="new badge" data-badge-caption="Friend">
                                <MaterialIcon icon={"check"} styleClass={"align-v"} />
                            </span>;
            }
            if (user.uid === su.uid) {
                secondary = <span className="new badge" data-badge-caption="You">
                                <MaterialIcon icon={"face"} styleClass={"align-v"} />
                            </span>;
            }

            return (
                <li className="collection-item font-primary text-h6" key={idx}>
                    <MaterialIcon icon={"person_outline"} styleClass="align-v mr-8" />
                    {su.firstName} {su.lastName}
                    {secondary}
                </li>
            );
        });

        return (
            <ul className="collection searchPeopleResults">
                {list}
            </ul>
        );
    }

    render() {
        const {searchResultUsers} = this.props;

        if (searchResultUsers !== null && !searchResultUsers.length) {
            const queryVal = document.getElementById("searchPeopleQuery").value;

            return (
                <div className="text-h5 font-tertiary col s12 noResultsFoundDisplay">
                    <MaterialIcon icon={"info"} styleClass={"text-info text-h4 align-v mr-8"} />
                    Sorry, no users were found for "{queryVal}"
                </div>
            );
        } else if (searchResultUsers !== null && searchResultUsers.length) {
            return this.renderResultList();
        }

        return(
            <div></div>
        );
    }
}

function mapStateToProps(state) {
    const {user, social} = state;

    return {
        user: user.user,
        friends: social.friends,
        searchResultUsers: social.searchPeopleResultUsers
    };
}

export default connect(mapStateToProps, {})(SearchPeopleResult);