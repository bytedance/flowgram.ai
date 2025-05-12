import {
  injectable,
  inject,
  WorkflowDocument,
  Playground,
  delay,
  WorkflowLineEntity,
  WorkflowNodeEntity,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-editor';
const RUNNING_INTERVAL = 1000;

@injectable()
export class RunningService {
  @inject(Playground) playground: Playground;

  @inject(WorkflowDocument) document: WorkflowDocument;

  private _runningNodes: WorkflowNodeEntity[] = [];

  async addRunningNode(node: WorkflowNodeEntity): Promise<void> {
    this._runningNodes.push(node);
    node.renderData.node.classList.add('node-running');
    this.document.linesManager.forceUpdate(); // Refresh line renderer
    await delay(RUNNING_INTERVAL);
    // Child Nodes
    await Promise.all(node.blocks.map((nextNode) => this.addRunningNode(nextNode)));
    // Sibling Nodes
    const nextNodes = node.getData(WorkflowNodeLinesData).outputNodes;
    await Promise.all(nextNodes.map((nextNode) => this.addRunningNode(nextNode)));
  }

  async startRun(): Promise<void> {
    await this.addRunningNode(this.document.getNode('start_0')!);
    this._runningNodes.forEach((node) => {
      node.renderData.node.classList.remove('node-running');
    });
    this._runningNodes = [];
    this.document.linesManager.forceUpdate();
  }

  isFlowingLine(line: WorkflowLineEntity) {
    return this._runningNodes.some((node) =>
      node.getData(WorkflowNodeLinesData).outputLines.includes(line)
    );
  }
}
