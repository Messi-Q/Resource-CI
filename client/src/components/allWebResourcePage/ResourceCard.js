import React from 'react';
import {Link} from 'react-router-dom';
import imgSrc from '../../images/react.png';

const ResourceCard = ({allWebResource}) => {
    return (
        <div className="ui card">
            <div className="ui image">
                <img src={imgSrc} alt="resource Cover"/>
            </div>
            <div className="content">
                <Link className="header" to={`/allWebResource/${allWebResource.resourceId}`}>{allWebResource.headline}</Link>
                <span className="right floated">
                    <i className="heart outline like icon">10</i>
                </span>
                <div className="description">There are the description of resources</div>
            </div>
            <div className="extra content">
                <span className="right floated">所有价：{allWebResource.ownershipPrice}$</span>
                <span className="">阅读价：{allWebResource.readPrice}$</span>
            </div>
            <div className="extra content">
                <div className="ui positive basic button">
                    <Link to={`/allWebResource/${allWebResource.resourceId}`} className="">Check file</Link>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;