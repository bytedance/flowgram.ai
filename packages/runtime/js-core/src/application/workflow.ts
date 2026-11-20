/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable no-console */
import {
  InvokeParams,
  IContainer,
  IEngine,
  ITask,
  IReport,
  WorkflowOutputs,
  IValidation,
  ValidationResult,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeContainer } from '@workflow/container';

export interface WorkflowApplicationOptions {
  /** Maximum number of running and retained tasks. Defaults to 1000. */
  maxTasks?: number;
  /** How long completed tasks remain queryable, in milliseconds. Defaults to five minutes. */
  taskRetentionMs?: number;
}

export class WorkflowApplication {
  private container: IContainer;

  public tasks: Map<string, ITask>;

  private readonly maxTasks: number;

  private readonly taskRetentionMs: number;

  // Insertion order tracks completion order, so only settled tasks are evicted.
  private readonly completedTasks = new Map<string, ReturnType<typeof setTimeout>>();

  constructor({
    maxTasks = 1000,
    taskRetentionMs = 5 * 60 * 1000,
  }: WorkflowApplicationOptions = {}) {
    if (!Number.isSafeInteger(maxTasks) || maxTasks <= 0) {
      throw new Error('maxTasks must be a positive safe integer');
    }
    if (!Number.isInteger(taskRetentionMs) || taskRetentionMs < 0 || taskRetentionMs > 2147483647) {
      throw new Error('taskRetentionMs must be an integer between 0 and 2147483647');
    }
    this.maxTasks = maxTasks;
    this.taskRetentionMs = taskRetentionMs;
    this.container = WorkflowRuntimeContainer.instance;
    this.tasks = new Map();
  }

  public run(params: InvokeParams): string {
    if (this.tasks.size >= this.maxTasks) {
      const oldestCompletedTaskID = this.completedTasks.keys().next().value;
      if (oldestCompletedTaskID === undefined) {
        throw new Error('Task capacity reached; try again after a running task completes');
      }
      this.removeTask(oldestCompletedTaskID);
    }
    const engine = this.container.get<IEngine>(IEngine);
    const task = engine.invoke(params);
    this.tasks.set(task.id, task);
    console.log('> POST TaskRun - taskID: ', task.id);
    console.log(params.inputs);
    task.processing.then(
      (output) => {
        this.retainCompletedTask(task.id);
        console.log('> LOG Task finished: ', task.id);
        console.log(output);
      },
      (error) => {
        this.retainCompletedTask(task.id);
        console.error('> LOG Task failed: ', task.id, error);
      }
    );
    return task.id;
  }

  private retainCompletedTask(taskID: string): void {
    if (this.taskRetentionMs === 0) {
      this.removeTask(taskID);
      return;
    }
    const timer = setTimeout(() => this.removeTask(taskID), this.taskRetentionMs);
    // Retention timers must not keep a Node.js process alive.
    if (typeof timer === 'object') {
      timer.unref();
    }
    this.completedTasks.set(taskID, timer);
  }

  private removeTask(taskID: string): void {
    const timer = this.completedTasks.get(taskID);
    if (timer !== undefined) {
      clearTimeout(timer);
    }
    this.completedTasks.delete(taskID);
    this.tasks.delete(taskID);
  }

  public cancel(taskID: string): boolean {
    console.log('> PUT TaskCancel - taskID: ', taskID);
    const task = this.tasks.get(taskID);
    if (!task) {
      return false;
    }
    task.cancel();
    return true;
  }

  public report(taskID: string): IReport | undefined {
    const task = this.tasks.get(taskID);
    console.log('> GET TaskReport - taskID: ', taskID);
    if (!task) {
      return;
    }
    return task.context.reporter.export();
  }

  public result(taskID: string): WorkflowOutputs | undefined {
    console.log('> GET TaskResult - taskID: ', taskID);
    const task = this.tasks.get(taskID);
    if (!task) {
      return;
    }
    if (!task.context.statusCenter.workflow.terminated) {
      return;
    }
    return task.context.ioCenter.outputs;
  }

  public validate(params: InvokeParams): ValidationResult {
    const validation = this.container.get<IValidation>(IValidation);
    const result = validation.invoke(params);
    console.log('> POST TaskValidate - valid: ', result.valid);
    return result;
  }

  private static _instance: WorkflowApplication;

  public static get instance(): WorkflowApplication {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new WorkflowApplication();
    return this._instance;
  }
}
