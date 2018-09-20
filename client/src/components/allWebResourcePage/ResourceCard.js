import React from 'react';
import {Link} from 'react-router-dom';
import './ResourceCard.css';

const ResourceCard = ({allWebResource}) => {
    return (
        <Link className="ui card resource-card" to={`/allWebResource/${allWebResource.resourceId}`}>

            <div className="ui image">
                <img src={allWebResource.coverUrl} alt="resource Cover"/>
            </div>
            <div className="content">
                <div className="large header resource-title">{allWebResource.headline}</div>
                <br/>
                <div className="description">There are the description of resources</div>
            </div>
            <div className="extra content">
                <span className="price">阅读价：{allWebResource.readPrice}$</span>
                <span className="right floated">
                    <i className="heart outline like icon">10</i>
                </span>
                <br/>
                <span className="price">所有价：{allWebResource.ownershipPrice}$</span>
            </div>
        </Link>
    );
};

export default ResourceCard;