import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ResourceCard = ({resource, deleteResource}) => {
    console.log(resource);
    return (
        <div className="ui card">
            <div className="ui image">
                <img src={resource.fileImage} alt="resource fileImage" x="0" y="0" width="100%" height="100%"/>
            </div>
            <div className="content">
                <Link className="header" to={`/resource/${resource.id}`}>{resource.fileTitle}</Link>
                <span className="right floated">
                    <i className="heart outline like icon">10</i>
                </span>
                <div className="description">{resource.fileDescription}</div>
            </div>
            <div className="extra content">
                <span className="right floated">所有价：{resource.fileRightPrice}$</span>
                <span className="">阅读价：{resource.fileReadPrice}$</span>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <Link to={`/resource/${resource.id}`} className="ui basic button green">Edit</Link>
                    <div className="ui basic button red" onClick={() => deleteResource(resource.id)}>Delete</div>
                </div>
            </div>
        </div>
    )
};

ResourceCard.propTypes = {
    resource: PropTypes.object.isRequired,
    deleteResource: PropTypes.func.isRequired
};

export default ResourceCard;