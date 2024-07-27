import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px;
  backgroud-color: #f8f9fa;
`;
export const TableWrapper = styled.div`
  border: 1px solid #e0e5eb;
  border-radius: 12px;
  overflow: hidden;
  max-height: 944px;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h1`
  font-size: 24px;
  line-height: 1.33;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  flex: 1;
  overflow: auto;
`;

export const TableHeader = styled.thead`
  background-color: #f0f3f7;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableHeaderCell = styled.th`
  padding: 13px;
  text-align: left;
  font-weight: 500;
  color: #697180;
  border-bottom: 1px solid #e0e5eb;
`;

export const TableBody = styled.tbody`
  flex-grow: 1;
  overflow: auto;
`;
export const ScrollWrapper = styled.div`
  overflow: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #5e6674;
    border-radius: 4px;
    max-height: 10px;
  }
`;
