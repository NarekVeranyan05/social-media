import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component: any) => {
  const ComponentWithRouterProp = (props: any) => {
    var location = useLocation();
    var navigate = useNavigate();
    var params = useParams();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter

