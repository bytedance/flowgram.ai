import React from 'react';

import styled, { css } from 'styled-components';
import Icon from '@douyinfe/semi-icons';

export const UIContainer = styled.div`
  /* & .semi-input {
    background-color: #fff;
    border-radius: 6px;
    height: 24px;
  } */
`;

export const UIRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const UICollapseTrigger = styled.div`
  cursor: pointer;
  margin-right: 5px;
`;

export const UIExpandDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UILabel = styled.div`
  font-size: 12px;
  color: #999;
  font-weight: 400;
  margin-bottom: 2px;
`;

export const UIProperties = styled.div<{ $shrink?: boolean }>`
  display: grid;
  grid-template-columns: auto 1fr;

  ${({ $shrink }) =>
    $shrink &&
    css`
      padding-left: 10px;
      margin-top: 10px;
    `}
`;

export const UIPropertyLeft = styled.div<{
  $isLast?: boolean;
  $showLine?: boolean;
  $isExpand?: boolean;
  type?: string;
  $isFirst?: boolean;
  $index?: number;
  $parentExpand?: boolean;
  $parentType?: string;
}>`
  grid-column: 1;
  position: relative;
  width: 16px;

  ${({ $showLine, $isLast, $parentType }) => {
    let height = '100%';
    if ($parentType && $isLast) {
      height = '24px';
    }

    return (
      $showLine &&
      css`
        &::before {
          /* 竖线 */
          content: '';
          height: ${height};
          position: absolute;
          left: -22px;
          top: -16px;
          width: 1px;
          background: #d9d9d9;
          display: block;
        }

        &::after {
          /* 横线 */
          content: '';
          position: absolute;
          left: -22px; // 横线起点和竖线对齐
          top: 8px; // 跟随你的行高调整
          width: 18px; // 横线长度
          height: 1px;
          background: #d9d9d9;
          display: block;
        }
      `
    );
  }}
`;

export const UIPropertyRight = styled.div`
  grid-column: 2;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const UIPropertyMain = styled.div<{
  $expand?: boolean;
  type?: string;
  $collapse?: boolean;
  $showCollapse?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;

  ${({ $expand, type, $collapse, $showCollapse }) => {
    const beforeElement = `
      &::before {
        /* 竖线 */
        content: '';
        height: 100%;
        position: absolute;
        left: -12px;
        top: 18px;
        width: 1px;
        background: #d9d9d9;
        display: block;
      }`;

    return (
      $expand &&
      css`
        background-color: #f5f5f5;
        padding: 10px;
        border-radius: 4px;

        ${$showCollapse &&
        $collapse &&
        (type === 'array' || type === 'object') &&
        css`
          ${beforeElement}
        `}
      `
    );
  }}
`;

export const UICollapsible = styled.div<{ $collapse?: boolean }>`
  display: none;

  ${({ $collapse }) =>
    $collapse &&
    css`
      display: block;
    `}
`;

export const UIName = styled.div`
  flex-grow: 1;
`;

export const UIType = styled.div``;

export const UIRequired = styled.div``;

export const UIActions = styled.div`
  white-space: nowrap;
`;

const iconAddChildrenSvg = (
  <svg
    className="icon-icon icon-icon-coz_add_node "
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 6.49988C11 8.64148 9.50397 10.4337 7.49995 10.8884V15.4998C7.49995 16.0521 7.94767 16.4998 8.49995 16.4998H11.208C11.0742 16.8061 11 17.1443 11 17.4998C11 17.8554 11.0742 18.1936 11.208 18.4998H8.49995C6.8431 18.4998 5.49995 17.1567 5.49995 15.4998V10.8884C3.49599 10.4336 2 8.64145 2 6.49988C2 4.0146 4.01472 1.99988 6.5 1.99988C8.98528 1.99988 11 4.0146 11 6.49988ZM6.5 8.99988C7.88071 8.99988 9 7.88059 9 6.49988C9 5.11917 7.88071 3.99988 6.5 3.99988C5.11929 3.99988 4 5.11917 4 6.49988C4 7.88059 5.11929 8.99988 6.5 8.99988Z"
    ></path>
    <path d="M17.5 12.4999C18.0523 12.4999 18.5 12.9476 18.5 13.4999V16.4999H21.5C22.0523 16.4999 22.5 16.9476 22.5 17.4999C22.5 18.0522 22.0523 18.4999 21.5 18.4999H18.5V21.4999C18.5 22.0522 18.0523 22.4999 17.5 22.4999C16.9477 22.4999 16.5 22.0522 16.5 21.4999V18.4999H13.5C12.9477 18.4999 12.5 18.0522 12.5 17.4999C12.5 16.9476 12.9477 16.4999 13.5 16.4999H16.5V13.4999C16.5 12.9476 16.9477 12.4999 17.5 12.4999Z"></path>
  </svg>
);

export const IconAddChildren = () => <Icon size="small" svg={iconAddChildrenSvg} />;

export const DefaultValueWrapper = styled.div`
  margin: 0;
`;

export const JSONViewerWrapper = styled.div`
  padding: 0 0 24px;
  &:first-child {
    margin-top: 0px;
  }
`;

export const JSONHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--semi-color-fill-0);
  border-radius: 6px 6px 0 0;
  height: 36px;
  padding: 0 8px 0 12px;
`;

export const JSONHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const JSONHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
