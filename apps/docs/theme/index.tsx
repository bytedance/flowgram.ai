/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useEffect, useMemo, useState } from 'react';

import { LlmsContainer, LlmsCopyButton, LlmsViewOptions } from '@rspress/plugin-llms/runtime';
import {
  HomeLayout as BaseHomeLayout,
  getCustomMDXComponent as basicGetCustomMDXComponent,
} from '@rspress/core/theme';
import { NoSSR, removeBase, useLocation, usePageData } from '@rspress/core/runtime';

import { Background } from './components/background';

import './theme.css';
import { FlowGramLogo } from './components/logo';

function getCustomMDXComponent() {
  const { h1: H1, ...components } = basicGetCustomMDXComponent();

  const MyH1 = ({ ...props }) => (
    <>
      <H1 {...props} />
      <LlmsContainer>
        <LlmsCopyButton />
        <LlmsViewOptions />
      </LlmsContainer>
    </>
  );
  return {
    ...components,
    h1: MyH1,
  };
}

function HomeLayout(props: Parameters<typeof BaseHomeLayout>[0]) {
  const { pathname } = useLocation();
  const isZh = pathname.startsWith('/zh/');
  const { page } = usePageData();

  return (
    <>
      <div className="home-layout-container">
        <NoSSR>
          <Background />
          <FlowGramLogo />
        </NoSSR>
        <BaseHomeLayout {...props} afterHero={null} afterHeroActions={null} />
      </div>
    </>
  );
}

export { getCustomMDXComponent, HomeLayout };
export * from '@rspress/core/theme';
