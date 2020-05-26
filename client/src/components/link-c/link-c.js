import React from 'react';
import { Link } from 'react-router-dom';

import './link-c.scss';

const LinkC = (props) => {
    const { isActive, link } = props;
    const cclassName = isActive === link ? ' active' : '';
    return (
        <Link to={link} className={`link${cclassName}`}>
            {
                props.children
            }
        </Link>
    )
}
export default LinkC;
