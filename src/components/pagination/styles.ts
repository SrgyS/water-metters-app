import { styled } from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  justify-content: end;
  height: 48px;
  background-color: #fff;
  padding: 8px 16px;
  gap: 8px;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #eef0f4;
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ced5de;
  background-color: #fff;
  cursor: pointer;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e9ecef;
  }

  &.active {
    background-color: #f2f5f8;
  }

  &:disabled {
    cursor: not-allowed;
    color: #000;

    &:hover {
      background-color: #fff;
    }
  }
`;
