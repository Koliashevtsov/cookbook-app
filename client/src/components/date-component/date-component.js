import React from 'react';

import moment from 'moment';

const DateComponent = (props) => {
    const { date } = props;

    // get date in miliseconds
    // const now = Date.now()
    const dateInFormat = moment(parseInt(date)).format("MMM. D, YYYY")

    return (
        <span> {dateInFormat}</span>
    );
}
export default DateComponent;
