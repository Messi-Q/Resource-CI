//eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import ResourceCard from './ResourceCard';

const ResourceList = ({resources, deleteResource}) => {
    const emptyMessage = (
        <h2 align="center">There is no resources</h2>
    );
    //循环取出
    const resourceList = (
        <div className="ui three cards">
            {resources.map(resource =>
                <ResourceCard
                    deleteResource={deleteResource}
                    resource={resource}
                    key={resource.id}
                />)
            }
        </div>
    );

    return (
        <div>
            {resources.length === 0 ? emptyMessage : resourceList}
        </div>
    )
};

ResourceList.propTypes = {
    resources: PropTypes.array.isRequired,
    deleteResource: PropTypes.func.isRequired
};

export default ResourceList;