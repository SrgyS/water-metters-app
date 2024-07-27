import axios from 'axios';
import queryString from 'query-string';
const API_BASE_URL = 'http://showroom.eis24.me/api/v4/test';

const api = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: 'none' }),
});

export const getMeters = (limit: number, offset: number) => {
  return api.get('/meters', {
    params: { offset, limit },
  });
};

export const getAreas = (ids: string[]) => {
  const params = ids.length ? { id__in: ids } : {};

  return api.get('/areas', { params });
};

export const deleteMeter = (id: string) => {
  return api.delete(`/meters/${id}/`);
};
