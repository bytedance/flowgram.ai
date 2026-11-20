/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { LlmsContainer, LlmsCopyButton, LlmsViewOptions } from '@rspress/plugin-llms/runtime';
import {
  HomeLayout as BaseHomeLayout,
  getCustomMDXComponent as basicGetCustomMDXComponent,
} from '@rspress/core/theme-original';
import { NoSSR, useDark } from '@rspress/core/runtime';

import { useIsMobile } from './use-is-mobile';
import { FlowGramLogo } from './components/logo';
import { DesktopShowcase } from './components/desktop-showcase';
import { Background } from './components/background';

import './theme.css';

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
  const isDark = useDark();
  const isMobile = useIsMobile();

  return (
    <>
      <>
        <NoSSR>
          {isDark && !isMobile && <Background />}
          <FlowGramLogo />
        </NoSSR>
        <BaseHomeLayout {...props} afterHero={<DesktopShowcase />} afterHeroActions={null} />
      </>
    </>
  );
}

export { getCustomMDXComponent, HomeLayout };
export * from '@rspress/core/theme-original';
