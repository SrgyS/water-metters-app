import { Instance, flow, t } from 'mobx-state-tree';
import { deleteMeter, getAreas, getMeters } from '../services/api';

import { Area } from './models/area-model';
import { Meter } from './models/meter-model';
import { format } from 'date-fns';

const limit = 20;

interface IHouse {
  address: string;
  id: string;
  fias_addrobjs: string[];
}

interface IServerArea {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: IHouse;
}
interface IServerMeter {
  id: string;
  _type: string[];
  area: {
    id: string;
  };
  is_automatic: boolean | null;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
}

const extractAddressDetails = (address: string) => {
  const addressRegex = /ул\s([^\d]+)\s*,\s*д\s*(\d+)/;
  const match = address.match(addressRegex);

  if (!match) throw new Error('Неверный формат адреса');

  return { street: match[1], house: match[2] };
};

const transformAreaData = (serverData: IServerArea) => {
  const { street, house } = extractAddressDetails(serverData.house.address);

  return {
    id: serverData.id,
    street: street,
    house: house,
    flat: serverData.str_number,
  };
};

const transformMeterData = (serverData: IServerMeter) => {
  return {
    id: serverData.id,
    type: serverData._type[0],
    installationDate: format(
      new Date(serverData.installation_date),
      'dd.MM.yyyy'
    ),
    isAutomatic: serverData.is_automatic ?? false,
    currentReading: serverData.initial_values[0],
    addressId: serverData.area.id,
    description: serverData.description,
  };
};

export const MeterStore = t
  .model('MeterStore', {
    meters: t.optional(t.array(Meter), []),
    areas: t.optional(t.array(Area), []),
    currentPage: t.optional(t.number, 1),
    totalCount: t.optional(t.number, 0),
    state: t.optional(
      t.enumeration('State', ['pending', 'done', 'error']),
      'pending'
    ),
  })
  .actions((self) => {
    const fetchMeters = flow(function* () {
      const offset = (self.currentPage - 1) * limit;
      self.state = 'pending';
      try {
        const response = yield getMeters(limit, offset);
        const transformedMeters = response.data.results.map(transformMeterData);
        const areaIds = [
          ...new Set(
            transformedMeters.map((meter: MeterInstance) => meter.addressId)
          ),
        ];
        const newAreaIds = areaIds.filter(
          (id) => !self.areas.find((area: AreaInstance) => area.id === id)
        );
        if (newAreaIds.length) {
          const areasResponse = yield getAreas(newAreaIds as string[]);
          const transformedAreas =
            areasResponse.data.results.map(transformAreaData);
          self.areas.push(...transformedAreas);
        }
        self.meters.replace(transformedMeters);
        self.totalCount = response.data.count;
        self.state = 'done';
      } catch (error) {
        console.error('Failed to fetch meters', error);
        self.state = 'error';
      }
    });

    const removeMeter = flow(function* (meterId: string) {
      self.state = 'pending';
      try {
        yield deleteMeter(meterId);
        self.meters.replace(
          self.meters.filter((meter: MeterInstance) => meter.id !== meterId)
        );
        self.totalCount -= 1;

        if (
          self.totalCount > self.meters.length &&
          self.meters.length < limit
        ) {
          const offset = (self.currentPage - 1) * limit + self.meters.length;
          const response = yield getMeters(1, offset);

          if (response.data.results.length > 0) {
            const newMeter = transformMeterData(response.data.results[0]);

            if (
              !self.areas.find(
                (area: AreaInstance) => area.id === newMeter.addressId
              )
            ) {
              const areasResponse = yield getAreas([newMeter.addressId]);
              const newArea = transformAreaData(areasResponse.data.results[0]);
              self.areas.push(newArea);
            }

            self.meters.push(newMeter);
          }
        }
        if (self.meters.length === 0 && self.currentPage > 1) {
          self.currentPage -= 1;
          yield fetchMeters();
        }
        self.state = 'done';
      } catch (error) {
        console.error('Failed to delete meter', error);
        self.state = 'error';
      }
    });

    const setPage = (page: number) => {
      self.currentPage = page;
    };

    return {
      fetchMeters,
      removeMeter,
      setPage,
    };
  })
  .views((self) => ({
    get totalPages() {
      return Math.ceil(self.totalCount / limit);
    },
  }));

export type MeterStoreInstance = Instance<typeof MeterStore>;
export type MeterInstance = Instance<typeof Meter>;
export type AreaInstance = Instance<typeof Area>;
