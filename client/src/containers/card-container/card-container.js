import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { compose } from '../../utils';

import Card from '../../components/card';

class CardContainer extends Component {

    chooseItem(itemVersion){
        // add our id and updatedDate to path
        const recipeId = this.props.recipeId;
        const updatedDate = itemVersion.updatedDate;
        this.props.history.push(`/view-page/${recipeId}/${updatedDate}`)
    }

    render(){
        const { itemVersion, publishedDate } = this.props
        return (
            <Card item={itemVersion}
                publishedDate={publishedDate}
                handleClick={() => this.chooseItem(itemVersion)}/>
        );
    }
}

export default compose(
    withRouter
)(CardContainer);
