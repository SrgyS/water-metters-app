import styled from 'styled-components';

export const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f7f8f9;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;
export const TypeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeIcon = styled.img`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const DeleteButton = styled.button`
  background-color: #fee3e3;
  border: none;
  color: #c53030;
  cursor: pointer;
  opacity: 0;
  padding: 12px;
  border-radius: 8px;
  transition: opacity 0.1s;

  ${TableRow}:hover & {
    opacity: 1;
  }

  &:active {
    color: #9b2c2c;
    background-color: #fed7d7;
  }

  svg {
    fill: currentColor;
    width: 16px;
    height: 16px;
    transition: fill 0.3s;
  }
`;
export const LastTableCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: end;
`;
