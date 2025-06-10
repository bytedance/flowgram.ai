import styled from 'styled-components';

export const SubCanvasTipsStyle = styled.div`
  pointer-events: auto;
  position: absolute;
  top: 0;

  width: 100%;
  height: 28px;

  .container {
    height: 100%;
    background-color: #e4e6f5;
    border-radius: 4px 4px 0 0;

    .content {
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      .text {
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        line-height: 20px;
        color: rgba(15, 21, 40, 82%);
        text-overflow: ellipsis;
      }

      .custom-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        /* 为自定义内容提供默认样式，但允许覆盖 */
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(15, 21, 40, 82%);

        /* 确保自定义内容不会超出容器 */
        overflow: hidden;
      }

      .space {
        width: 128px;
      }
    }

    .actions {
      position: absolute;
      top: 0;
      right: 0;

      display: flex;
      gap: 8px;
      align-items: center;

      height: 28px;
      padding: 0 16px;

      .close-forever {
        cursor: pointer;

        padding: 0 3px;

        font-size: 12px;
        font-weight: 400;
        font-style: normal;
        line-height: 12px;
        color: rgba(32, 41, 69, 62%);
      }

      .close {
        display: flex;
        cursor: pointer;
        height: 100%;
        align-items: center;
      }
    }
  }
`;
