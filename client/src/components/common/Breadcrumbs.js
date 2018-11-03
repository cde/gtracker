
import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to="/workspace">{props.goBack}</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.current}</BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;