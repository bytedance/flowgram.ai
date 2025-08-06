/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, multiInject, optional } from 'inversify';
import { Disposable, DisposableCollection, Emitter } from '@flowgram.ai/utils';

import { type CommandService } from './command-service';

export interface Command {
  /**
   * id，唯一 key
   */
  id: string;
  /**
   * 展示用 label
   */
  label?: string;
  /**
   * 在一些明确的场景下，部分只展示简短的 label 即可
   */
  shortLabel?: string;

  /**
   * 展示用 command icon
   */
  icon?: string | React.ReactNode | ((props: any) => React.ReactNode);
  /**
   * 暂不使用
   */
  category?: string;
}
export namespace Command {
  export enum Default {
    ZOOM_IN = 'ZOOM_IN',
    ZOOM_OUT = 'ZOOM_OUT',
    DELETE = 'DELETE',
    COPY = 'COPY',
    PASTE = 'PASTE',
    UNDO = 'UNDO',
    REDO = 'REDO',
    VIEW_CLOSE_ALL_WIDGET = 'view.closeAllWidget',
    VIEW_CLOSE_CURRENT_WIDGET = 'view.closeCurrentWidget',
    VIEW_REOPEN_LAST_WIDGET = 'view.reopenLastWidget',
    VIEW_CLOSE_OTHER_WIDGET = 'view.closeOtherWidget',
    VIEW_CLOSE_BOTTOM_PANEL = 'view.closeBottomPanel',
    VIEW_OPEN_NEXT_TAB = 'view.openNextTab',
    VIEW_OPEN_LAST_TAB = 'view.openLastTab',
    VIEW_FULL_SCREEN = 'view.fullScreen',
    VIEW_SAVING_WIDGET_CLOSE_CONFIRM = 'view.savingWidgetCloseConfirm',
    VIEW_SHORTCUTS = 'view.shortcuts',
    VIEW_PREFERENCES = 'view.preferences',
    VIEW_LOG = 'view.log',
    VIEW_PROBLEMS = 'view.problems',
  }

  /**
   * 判断是否是 command
   */
  export function is(arg: Command | any): arg is Command {
    return !!arg && arg === Object(arg) && 'id' in arg;
  }
}

export interface CommandHandler {
  /**
   * handler 执行函数
   */
  execute(...args: any[]): any;

  /**
   * 该 handler 是否可以执行
   */
  isEnabled?(...args: any[]): boolean;

  /**
   * 预留 contextMenu 用，该 handler 是否可见
   */
  isVisible?(...args: any[]): boolean;

  /**
   * 预留 contextMenu 用，该 handler 是否可以触发
   */
  isToggled?(...args: any[]): boolean;
}

export interface CommandEvent {
  /**
   * commandId
   */
  commandId: string;
  /**
   * 参数
   */
  args: any[];
}
export const CommandContribution = Symbol('CommandContribution');

export interface CommandContribution {
  /**
   * 注册 command
   */
  registerCommands(commands: CommandService): void;
}

/**
 * 当前正在运行的 command
 */
interface CommandExecuting {
  /**
   * commandid
   */
  id: string;
  /**
   * 参数
   */
  args: any[];
  /**
   * 正在进行的 promise
   */
  promise?: Promise<any>;
}

namespace CommandExecuting {
  /**
   * 获取正在运行的 command 单个实例
   */
  export function findSimple(
    arrs: Set<CommandExecuting>,
    newCmd: CommandExecuting,
  ): CommandExecuting | undefined {
    for (const item of arrs.values()) {
      if (
        item.id === newCmd.id &&
        item.args.length === newCmd.args.length &&
        item.args.every((arg, index) => (newCmd as any)[index] === arg)
      ) {
        return item;
      }
    }
  }
}

export const CommandRegistryFactory = 'CommandRegistryFactory';

@injectable()
export class CommandRegistry implements CommandService {
  protected readonly _handlers: { [id: string]: CommandHandler[] } = {};

  protected readonly _commands: { [id: string]: Command } = {};

  protected readonly _commandExecutings = new Set<CommandExecuting>();

  protected readonly toUnregisterCommands = new Map<string, Disposable>();

  protected readonly onDidExecuteCommandEmitter = new Emitter<CommandEvent>();

  readonly onDidExecuteCommand = this.onDidExecuteCommandEmitter.event;

  protected readonly onWillExecuteCommandEmitter = new Emitter<CommandEvent>();

  readonly onWillExecuteCommand = this.onWillExecuteCommandEmitter.event;

  @multiInject(CommandContribution)
  @optional()
  protected readonly contributions: CommandContribution[];

  init() {
    for (const contrib of this.contributions) {
      contrib.registerCommands(this);
    }
  }

  /**
   * 当前所有 command
   */
  get commands(): Command[] {
    const commands: Command[] = [];
    for (const id of this.commandIds) {
      const cmd = this.getCommand(id);
      if (cmd) {
        commands.push(cmd);
      }
    }
    return commands;
  }

  /**
   * 当前所有 commandid
   */
  get commandIds(): string[] {
    return Object.keys(this._commands);
  }

  /**
   * registerCommand
   */
  registerCommand(id: string, handler?: CommandHandler): Disposable;

  registerCommand(command: Command, handler?: CommandHandler): Disposable;

  registerCommand(commandOrId: string | Command, handler?: CommandHandler): Disposable {
    const command: Command = typeof commandOrId === 'string' ? { id: commandOrId } : commandOrId;

    if (this._commands[command.id]) {
      console.warn(`A command ${command.id} is already registered.`);
      return Disposable.NULL;
    }
    const toDispose = new DisposableCollection(this.doRegisterCommand(command));
    if (handler) {
      toDispose.push(this.registerHandler(command.id, handler));
    }
    this.toUnregisterCommands.set(command.id, toDispose);
    toDispose.push(Disposable.create(() => this.toUnregisterCommands.delete(command.id)));
    return toDispose;
  }

  /**
   * unregisterCommand
   */
  unregisterCommand(command: Command): void;

  unregisterCommand(id: string): void;

  unregisterCommand(commandOrId: Command | string): void {
    const id = Command.is(commandOrId) ? commandOrId.id : commandOrId;
    const toUnregister = this.toUnregisterCommands.get(id);
    if (toUnregister) {
      toUnregister.dispose();
    }
  }

  /**
   * 注册 handler
   */
  registerHandler(commandId: string, handler: CommandHandler): Disposable {
    let handlers = this._handlers[commandId];
    if (!handlers) {
      this._handlers[commandId] = handlers = [];
    }
    handlers.unshift(handler);
    return {
      dispose: () => {
        const idx = handlers.indexOf(handler);
        if (idx >= 0) {
          handlers.splice(idx, 1);
        }
      },
    };
  }

  /**
   * 预留 contextMenu 用，该 handler 是否可见
   */
  isVisible(command: string, ...args: any[]): boolean {
    return typeof this.getVisibleHandler(command, ...args) !== 'undefined';
  }

  /**
   * command 是否可用
   */
  isEnabled(command: string, ...args: any[]): boolean {
    return typeof this.getActiveHandler(command, ...args) !== 'undefined';
  }

  /**
   * 预留 contextMenu 用，该 handler 是否可以触发
   */
  isToggled(command: string, ...args: any[]): boolean {
    return typeof this.getToggledHandler(command, ...args) !== 'undefined';
  }

  /**
   * 执行 command，会先判断是否可以执行，不会重复执行
   */
  async executeCommand<T>(commandId: string, ...args: any[]): Promise<T | undefined> {
    const handler = this.getActiveHandler(commandId, ...args);
    const execInfo: CommandExecuting = { id: commandId, args };
    const simpleExecInfo = CommandExecuting.findSimple(this._commandExecutings, execInfo);
    if (simpleExecInfo) {
      return execInfo.promise;
    }
    if (handler) {
      try {
        this._commandExecutings.add(execInfo);
        this.onWillExecuteCommandEmitter.fire({ commandId, args });
        const promise = handler.execute(...args);
        execInfo.promise = promise;
        const result = await promise;
        this.onDidExecuteCommandEmitter.fire({ commandId, args });
        return result;
      } finally {
        this._commandExecutings.delete(execInfo);
      }
    }
  }

  getVisibleHandler(commandId: string, ...args: any[]): CommandHandler | undefined {
    const handlers = this._handlers[commandId];
    if (handlers) {
      for (const handler of handlers) {
        try {
          if (!handler.isVisible || handler.isVisible(...args)) {
            return handler;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return undefined;
  }

  getActiveHandler(commandId: string, ...args: any[]): CommandHandler | undefined {
    const handlers = this._handlers[commandId];
    if (handlers) {
      for (const handler of handlers) {
        try {
          if (!handler.isEnabled || handler.isEnabled(...args)) {
            return handler;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return undefined;
  }

  /**
   * 获取 command 对应的所有 handler
   */
  getAllHandlers(commandId: string): CommandHandler[] {
    const handlers = this._handlers[commandId];
    return handlers ? handlers.slice() : [];
  }

  getToggledHandler(commandId: string, ...args: any[]): CommandHandler | undefined {
    const handlers = this._handlers[commandId];
    if (handlers) {
      for (const handler of handlers) {
        try {
          if (handler.isToggled && handler.isToggled(...args)) {
            return handler;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return undefined;
  }

  /**
   * 获取 command
   */
  getCommand(id: string): Command | undefined {
    return this._commands[id];
  }

  protected doRegisterCommand(command: Command): Disposable {
    this._commands[command.id] = command;
    return {
      dispose: () => {
        delete this._commands[command.id];
      },
    };
  }

  /**
   * 更新 command
   */
  public updateCommand(id: string, command: Partial<Omit<Command, 'id'>>) {
    if (this._commands[id]) {
      this._commands[id] = {
        ...this._commands[id],
        ...command,
      };
    }
  }

  dispose() {
    this.onWillExecuteCommandEmitter.dispose();
    this.onDidExecuteCommandEmitter.dispose();
  }
}
