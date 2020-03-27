import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Collapse from '../../components/collapse';
import PreversionsList from '../../components/preversions-list';

import { compose } from '../../utils';

class PreversionsListContainer extends Component {
    render(){
        return (
            <>
                {   // if list of previous versions not empty
                    // render button in collapse to open list
                    this.props.previousVersions.length > 0 &&
                        <Collapse>
                            <PreversionsList
                                items={this.props.previousVersions}
                                publishedDate={this.props.publishedDate}/>
                        </Collapse>
                }
            </>
        );
    }
}

const mapStateToProps = (state, { match }) => {
    const recipeId = match.params.recipeId;
    return {
        previousVersions: state.previousVersions,
        publishedDate: state.listRecipes.find(item => item.id == recipeId)
    };
}
export default compose(
    withRouter,
    connect(mapStateToProps)
)(PreversionsListContainer)
