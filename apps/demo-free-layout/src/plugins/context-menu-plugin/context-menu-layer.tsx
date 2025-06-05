import { NodePanelResult, WorkflowNodePanelService } from '@flowgram.ai/free-node-panel-plugin';
import {
  Layer,
  injectable,
  inject,
  FreeLayoutPluginContext,
  WorkflowHoverService,
  WorkflowNodeEntity,
  WorkflowNodeJSON,
} from '@flowgram.ai/free-layout-editor';

@injectable()
export class ContextMenuLayer extends Layer {
  @inject(FreeLayoutPluginContext) ctx: FreeLayoutPluginContext;

  @inject(WorkflowNodePanelService) nodePanelService: WorkflowNodePanelService;

  @inject(WorkflowHoverService) hoverService: WorkflowHoverService;

  onReady() {
    this.listenPlaygroundEvent('contextmenu', (e) => {
      this.openNodePanel(e);
      e.preventDefault();
      e.stopPropagation();
    });
  }

  openNodePanel(e: MouseEvent) {
    const pos = this.getPosFromMouseEvent(e);
    this.nodePanelService.callNodePanel({
      position: pos,
      panelProps: {},
      // handle node selection from panel - 处理从面板中选择节点
      onSelect: async (panelParams?: NodePanelResult) => {
        if (!panelParams) {
          return;
        }
        const { nodeType, nodeJSON } = panelParams;
        // create new workflow node based on selected type - 根据选择的类型创建新的工作流节点
        const node: WorkflowNodeEntity = this.ctx.document.createWorkflowNodeByType(
          nodeType,
          pos,
          nodeJSON ?? ({} as WorkflowNodeJSON)
        );
        // select the newly created node - 选择新创建的节点
        this.ctx.selection.selection = [node];
      },
      // handle panel close - 处理面板关闭
      onClose: () => {},
    });
  }
}
