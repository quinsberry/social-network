import React, { Suspense } from 'react';

import LazyLoadingContainer from '../components/Header/LazyLoadingContainer';

export const withSuspense = (Component) => {


  return (props) => {
    return (
      <Suspense fallback={<LazyLoadingContainer />}>
        <Component {...props} />
      </Suspense>
    )
  }
};

export default withSuspense;