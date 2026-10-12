/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import {
  FlowRendererComponentType,
  FlowRendererRegistry,
  usePlaygroundContainer,
} from '@flowgram.ai/editor';

type WithRenderKey<T> = T & { renderKey?: string };

/**
 * Creates a material component wrapper with dependency injection support
 *
 * This Higher-Order Component (HOC) implements a dynamic component replacement mechanism
 * for material components. It automatically checks if a custom renderer is registered
 * in the editor context, using the injected component if available, otherwise
 * falling back to the default component.
 *
 * @example
 * ```tsx
 * // 1.Create an injectable material component
 * const InjectVariableSelector = createInjectMaterial(VariableSelector)
 *
 * // 2. Register custom components in editor
 * // Configure in use-editor-props.tsx:
 * const editorProps = {
 *   materials: {
 *     components: {
 *       [VariableSelector.renderKey]: YourCustomVariableSelector
 *     }
 *   }
 * }
 * ```
 *
 * @description
 * Data flow explanation:
 * - Register components to FlowRendererRegistry in use-editor-props
 * - InjectMaterial reads renderers from FlowRendererRegistry
 * - If registered renderer exists and type is REACT, use injected component
 * - If not exists or type mismatch, fallback to default component
 *
 * @param Component - Default React component
 * @param params - Optional parameters
 * @param params.renderKey - Custom render key name, highest priority
 * @returns Wrapper component with dependency injection support
 */
export function createInjectMaterial<Props>(
  Component: WithRenderKey<React.FC<Props> | React.ExoticComponent<Props>>,
  params?: {
    renderKey?: string;
  }
): WithRenderKey<React.FC<Props>> {
  // Determine render key: prioritize param specified, then component renderKey, finally component name
  const renderKey = params?.renderKey || Component.renderKey || Component.name || '';

  const InjectComponent: WithRenderKey<React.FC<Props>> = (props) => {
    const container = usePlaygroundContainer();

    // Check if renderer registry is bound in container
    if (!container?.isBound?.(FlowRendererRegistry)) {
      // If no registry, use default component directly
      return React.createElement(Component as (props?: any) => any, { ...props });
    }

    // Get renderer registry instance
    const rendererRegistry = container.get(FlowRendererRegistry);

    // Get corresponding renderer from registry
    const renderer = rendererRegistry.tryToGetRendererComponent(renderKey);

    // Check if renderer exists and type is React component
    if (renderer?.type !== FlowRendererComponentType.REACT) {
      // If no suitable renderer found, fallback to default component
      return React.createElement(Component as (props?: any) => any, { ...props });
    }

    // Render using injected React component
    return React.createElement(renderer.renderer, {
      ...props,
    });
  };

  InjectComponent.renderKey = renderKey;

  return InjectComponent;
}
