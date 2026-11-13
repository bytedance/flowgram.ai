/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createRoot } from 'react-dom/client';

import { clearLegacyViewState } from './lib/workbench';
import { initializeTheme } from './lib/themes';
import { App } from './app';
import './styles.css';
document.documentElement.dataset.motion = localStorage.getItem('flowgram.motion') || 'system';
clearLegacyViewState();
const disposeTheme = initializeTheme();
if (import.meta.hot) import.meta.hot.dispose(disposeTheme);

createRoot(document.getElementById('root')!).render(<App />);
