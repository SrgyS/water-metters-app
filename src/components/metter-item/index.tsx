import {
  DeleteButton,
  LastTableCell,
  TableCell,
  TableRow,
  TypeIcon,
  TypeWrapper,
} from './styles';

import { MeterInstance } from '../../store/meter-store';
import coldWater from '../../assets/cold-water-icon.png';
import hotWater from '../../assets/hot-water-icon.png';
import { observer } from 'mobx-react-lite';
import TrashIcon from '../../assets/trash.svg?react';

interface MeterItemProps {
  meter: MeterInstance;
  index: number;
}

const MeterItem = observer(({ meter, index }: MeterItemProps) => {
  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'ColdWaterAreaMeter':
        return {
          icon: coldWater,
          text: 'ХВС',
          alt: 'Cold Water',
        };
      case 'HotWaterAreaMeter':
        return {
          icon: hotWater,
          text: 'ГВС',
          alt: 'Hot Water',
        };
      default:
        return {
          icon: null,
          text: 'Неизвестный тип',
          alt: '',
        };
    }
  };

  const typeInfo = getTypeInfo(meter.type);

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell>
        <TypeWrapper>
          {typeInfo.icon && <TypeIcon src={typeInfo.icon} alt={typeInfo.alt} />}
          <span>{typeInfo.text}</span>
        </TypeWrapper>
      </TableCell>
      <TableCell>{meter.installationDate}</TableCell>
      <TableCell>{meter.isAutomatic ? 'да' : 'нет'}</TableCell>
      <TableCell>{meter.currentReading}</TableCell>
      <TableCell>{meter.address}</TableCell>
      <TableCell>{meter.description}</TableCell>
      <LastTableCell>
        <DeleteButton onClick={() => meter.remove()}>
          <TrashIcon />
        </DeleteButton>
      </LastTableCell>
    </TableRow>
  );
});

export default MeterItem;
