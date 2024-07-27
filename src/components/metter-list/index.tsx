import {
  ScrollWrapper,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableWrapper,
  Title,
} from './styles';

import { MeterInstance } from '../../store/meter-store';
import MeterItem from '../metter-item';
import { PaginationComponent } from '../pagination';
import { observer } from 'mobx-react-lite';

interface MeterListProps {
  meters: MeterInstance[];
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const MeterList = observer(
  ({ meters, onPageChange, currentPage, totalPages }: MeterListProps) => {
    return (
      <TableContainer>
        <Title>Список счётчиков</Title>
        <TableWrapper>
          <ScrollWrapper>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>№</TableHeaderCell>
                  <TableHeaderCell>Тип</TableHeaderCell>
                  <TableHeaderCell>Дата установки</TableHeaderCell>
                  <TableHeaderCell>Автоматический</TableHeaderCell>
                  <TableHeaderCell>Текущие показания</TableHeaderCell>
                  <TableHeaderCell>Адрес</TableHeaderCell>
                  <TableHeaderCell>Примечание</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </tr>
              </TableHeader>

              <TableBody>
                {meters.map((meter, index) => (
                  <MeterItem
                    key={meter.id}
                    meter={meter}
                    index={index + 1 + (currentPage - 1) * 20}
                  />
                ))}
              </TableBody>
            </Table>
          </ScrollWrapper>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </TableWrapper>
      </TableContainer>
    );
  }
);

export default MeterList;
