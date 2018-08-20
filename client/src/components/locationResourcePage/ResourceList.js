//eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import ResourceCard from './ResourceCard';

const ResourceList = ({localResources}) => {
    const emptyMessage = (
        <h2 align="center">There is no resources</h2>
    );
    //循环取出
    const resourceList = (
        <div className="ui three cards">
            {localResources.map(resource =>
                <ResourceCard resource={resource} key={resource.id}/>)
            }
        </div>
    );

    return (
        <div>
            {localResources.length === 0 ? emptyMessage : resourceList}
        </div>
    )
};

ResourceList.propTypes = {
    localResources: PropTypes.array.isRequired,
};

export default ResourceList;