import React from 'react';
import { Link } from 'react-router-dom';

const LinkComponent = (props) => {
    const { isActive, link } = props
    const cclassName = isActive === link ? 'active': '';
    return (
        <Link to={link} className="link">
            <span className={cclassName}>
                {
                    props.children
                }
            </span>
        </Link>

    )
}
export default LinkComponent;
