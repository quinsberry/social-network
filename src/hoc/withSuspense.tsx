import React, { Suspense } from 'react'

import LazyLoadingContainer from '@components/Header/LazyLoadingContainer'

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<LazyLoadingContainer />}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }
}

export default withSuspense
