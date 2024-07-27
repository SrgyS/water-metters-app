import { AreaInstance, MeterStoreInstance } from '../meter-store';
import { getParent, t } from 'mobx-state-tree';

export const Meter = t
  .model('Meter', {
    id: t.identifier,
    type: t.enumeration('Type', ['ColdWaterAreaMeter', 'HotWaterAreaMeter']),
    installationDate: t.string,
    isAutomatic: t.boolean,
    currentReading: t.number,
    addressId: t.string,
    description: t.string,
  })
  .views((self) => ({
    get address(): string {
      const store = getParent<MeterStoreInstance>(self, 2);
      const area = store.areas.find(
        (area: AreaInstance) => area.id === self.addressId
      );
      if (area) {
        return `ул. ${area.street}, д. ${area.house}, кв. ${area.flat}`;
      }
      return 'Адрес не найден';
    },
  }))
  .actions((self) => ({
    remove() {
      getParent<MeterStoreInstance>(self, 2).removeMeter(self.id);
    },
  }));
