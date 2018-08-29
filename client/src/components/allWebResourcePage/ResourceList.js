//eslint-disable-next-line
import React from 'react';
import PropTypes from 'prop-types';
import ResourceCard from "./ResourceCard";

const ResourceList = ({allWebResources}) => {
    // console.log(allWebResources);
    const emptyMessage = (
        <h2 align="center">There is no resources</h2>
    );
    //循环取出
    const resourceList = (
        <div className="ui three cards">
            {allWebResources.map(allWebResource =>
                <ResourceCard allWebResource={allWebResource} key={allWebResource.resourceId}/>)
            }
        </div>
    );

    return (
        <div>
            {allWebResources.length === 0 ? emptyMessage : resourceList}
        </div>
    )
};

ResourceList.propTypes = {
    allWebResources: PropTypes.array.isRequired,
};

export default ResourceList;