import React from 'react';

// https://github.com/web-infra-dev/rspress/issues/553
const FixedLayoutSimple = React.lazy(() =>
  import('@flowgram.ai/demo-fixed-layout-simple').then((module) => ({
    default: module.DemoFixedLayout,
  }))
);

export { FixedLayoutSimple };
