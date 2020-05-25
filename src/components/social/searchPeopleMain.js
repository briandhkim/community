import React, {Component} from 'react';
import {connect} from 'react-redux';

import {closeSearchPeopleWindow} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';
import SearchPeopleForm from './searchPeopleForm';
import SearchPeopleResult from './searchPeopleResult';

class SearchPeopleMain extends Component {

    render() {
        return(
            <div className="container searchPeopleMain">
                <div className="row">
                    <div className="col s10 mt-2r">
                        <h1 className="text-h2 font-primary mt-0">Search People</h1>
                    </div>
                    <div className="col s2 mt-2r">
                        <button className="btn-large btn-floating waves-effect waves-circle btn-secondary" onClick={this.props.closeSearchPeopleWindow}>
                            <MaterialIcon icon={"close"} styleClass={"text-bold"} />
                        </button>
                    </div>
                </div>
                <div className="row mb-0">
                    <SearchPeopleForm />
                </div>
                <div className="row">
                    <SearchPeopleResult />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {closeSearchPeopleWindow})(SearchPeopleMain);