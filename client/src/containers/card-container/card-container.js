import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentRecipe } from '../../actions';

import { compose } from '../../utils';

import Card from '../../components/card';

class CardContainer extends Component {
    render(){
        const { itemVersion, publishedDate } = this.props
        return (
            <Card item={itemVersion}
                publishedDate={publishedDate}
                handleClick={() => this.props.getCurrentItem(itemVersion)}/>
        );
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        getCurrentItem: (itemVersion) => {
            // add our id to path
            const parentId = itemVersion.parentId;
            const updatedDate = itemVersion.updatedDate
            history.push(`/view-page/${parentId}/${updatedDate}`)
            // request action-creator, i use updatedDate as identificator of version and
            // parentId as identificator of dish
            dispatch(getCurrentRecipe(parentId, updatedDate))
        }
    };
}

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(CardContainer);
