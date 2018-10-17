//eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import ResourceCard from './ResourceCard';

const ResourceList = ({buyResources}) => {
    const emptyMessage = (
        <h2 align="center">There is no resources</h2>
    );
    //循环取出
    const resourceList = (
        <div className="ui three cards">
            {buyResources.map(resource =>
                <ResourceCard
                    resource={resource}
                    key={resource.id}
                />)
            }
        </div>
    );

    return (
        <div>
            {buyResources.length === 0 ? emptyMessage : resourceList}
        </div>
    )
};

ResourceList.propTypes = {
    buyResources: PropTypes.array.isRequired,
};

export default ResourceList;