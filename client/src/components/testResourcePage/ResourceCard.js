import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './ResourceCard.css';

const ResourceCard = ({resource}) => {
    return (
        //  <Link className="resource-card" to={`locationResource/${resource.id}`}>
        <Link className="ui card resource-card" to={`testResources/${resource.id}`}>

            <div className="ui image">
                <img src={resource.fileImage} alt="resource Cover" x="0" y="0" width="100%" height="100%"/>
            </div>
            <div className="content">
                <div className="large header resource-title">{resource.fileTitle}</div>
                <br/>
                <div className="description">{resource.fileDescription}</div>
            </div>
            <div className="extra content">
                <span className="price">阅读价：{resource.fileReadPrice}$</span>
                <span className="right floated">
                    <i className="heart outline like icon">10</i>
                </span>
                <br/>
                <span className="price">所有价：{resource.fileRightPrice}$</span>
            </div>
        </Link>
    )
};

ResourceCard.propTypes = {
    resource: PropTypes.object.isRequired,
};

export default ResourceCard;