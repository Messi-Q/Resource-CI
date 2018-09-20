//eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import ResourceCard from './ResourceCard';

const ResourceList = ({testResources}) => {
    const emptyMessage = (
        <h2 align="center">There is no resources</h2>
    );
    //循环取出
    const resourceList = (
        <div className="ui three cards">
            {testResources.map(resource =>
                <ResourceCard
                    resource={resource}
                    key={resource.id}
                />)
            }
        </div>
    );

    return (
        <div>
            {testResources.length === 0 ? emptyMessage : resourceList}
        </div>
    )
};

ResourceList.propTypes = {
    testResources: PropTypes.array.isRequired,
};

export default ResourceList;