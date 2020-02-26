import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from '../../components/collapse';
import PreversionsList from '../../components/preversions-list';

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

const mapStateToProps = (state) => {
    return {
        previousVersions: state.previousVersions,
        publishedDate: state.listRecipes[state.currentVersion.parentId].publishedDate
    };
}
export default connect(mapStateToProps)(PreversionsListContainer)
