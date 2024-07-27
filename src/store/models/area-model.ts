import { t } from 'mobx-state-tree';

export const Area = t.model('Area', {
  id: t.identifier,
  street: t.string,
  house: t.string,
  flat: t.string,
});
