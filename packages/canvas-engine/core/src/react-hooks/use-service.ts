import { type interfaces } from 'inversify';

import { usePlaygroundContainer } from './use-playground-container';

/**
 * 获取画布的 IOC 模块
 * @param identifier
 */
export function useService<T>(identifier: interfaces.ServiceIdentifier<T>): T {
  const container = usePlaygroundContainer();
  return container.get?.(identifier) as T;
}
