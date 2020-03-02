import React from 'react';
import { Link } from 'react-router-dom';

const LinkComponent = (props) => {
    const { isActive, link, onClick } = props
    const cclassName = isActive === link ? 'active': '';
    return (
        <Link to={link} className="link">
            <span className={cclassName} onClick={() => onClick(link)}>
                {
                    props.children
                }
            </span>
        </Link>

    )
}
export default LinkComponent;
