import axios from 'axios';
import queryString from 'query-string';
import { DimensionInterface, DimensionGetQueryInterface } from 'interfaces/dimension';
import { GetQueryInterface } from '../../interfaces';

export const getDimensions = async (query?: DimensionGetQueryInterface) => {
  const response = await axios.get(`/api/dimensions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDimension = async (dimension: DimensionInterface) => {
  const response = await axios.post('/api/dimensions', dimension);
  return response.data;
};

export const updateDimensionById = async (id: string, dimension: DimensionInterface) => {
  const response = await axios.put(`/api/dimensions/${id}`, dimension);
  return response.data;
};

export const getDimensionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dimensions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDimensionById = async (id: string) => {
  const response = await axios.delete(`/api/dimensions/${id}`);
  return response.data;
};
