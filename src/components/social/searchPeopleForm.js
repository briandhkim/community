import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {searchPeople} from '../../actions/index';

import MaterialIcon from '../util/materialIcon';

class SearchPeopleForm extends Component {

    renderSearchInput({input, id, label, type, icon, meta:{touched, error}}) {
        return (
            <div className="input-field font-primary">
                <MaterialIcon icon={icon} styleClass={"prefix"} />
                <input {...input} id={id} type={type} className="white-text" />
                <label htmlFor={id} className="">{label}</label>
            </div>
        );
    }

    searchPeople(value) {
        const {query} = value;

        if (query === undefined || !query.trim().length) {return;}

        this.props.searchPeople(query);
    }

    render() {
        const {handleSubmit} = this.props;

        return(
            <div className="col s12 l10">
                <form onSubmit={handleSubmit((val)=>{this.searchPeople(val)})} className="searchPeopleForm">
                    <div className="row">
                        <Field name='query' id='searchPeopleQuery' type='text' label='Search' icon='search' component={this.renderSearchInput} />
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{};
}

SearchPeopleForm = reduxForm({
    form: 'searchPeople'
})(SearchPeopleForm);

export default connect(mapStateToProps, {searchPeople})(SearchPeopleForm);