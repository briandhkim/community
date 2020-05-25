import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {searchPeople, toggleSearchInProgress} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';

class SearchPeopleForm extends Component {

    renderSearchInput({input, id, label, type, icon, meta:{touched, error}}) {
        return (
            <div className="input-field font-primary col s10">
                <MaterialIcon icon={icon} styleClass={"prefix"} />
                <input {...input} id={id} type={type} className="font-secondary" />
                <label htmlFor={id} className="">{label}</label>
            </div>
        );
    }

    searchPeople(value) {
        const {searchInProgress} = this.props;
        if (searchInProgress) {return;}

        const {query} = value;
        if (query === undefined || !query.trim().length) {return;}

        this.props.toggleSearchInProgress();
        this.props.searchPeople(query);
    }

    render() {
        const {handleSubmit} = this.props;

        return(
            <div className="col s12 l10">
                <form onSubmit={handleSubmit((val)=>{this.searchPeople(val)})} className="searchPeopleForm">
                    <div className="row">
                        <Field name='query' id='searchPeopleQuery' type='text' label='Search' icon='search' component={this.renderSearchInput} />
                        <div className="input-field col s-2">
                            <button className="btn waves-effect bg-secondary" onClick={handleSubmit((val)=>{this.searchPeople(val)})}>
                                <MaterialIcon icon={"send"} aria-label="Submit Search" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {social} = state;
    return{
        searchInProgress: social.searchInProgress
    };
}

SearchPeopleForm = reduxForm({
    form: 'searchPeople'
})(SearchPeopleForm);

export default connect(mapStateToProps, {searchPeople,toggleSearchInProgress})(SearchPeopleForm);