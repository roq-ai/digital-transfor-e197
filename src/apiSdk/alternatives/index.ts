import axios from 'axios';
import queryString from 'query-string';
import { AlternativeInterface, AlternativeGetQueryInterface } from 'interfaces/alternative';
import { GetQueryInterface } from '../../interfaces';

export const getAlternatives = async (query?: AlternativeGetQueryInterface) => {
  const response = await axios.get(`/api/alternatives${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAlternative = async (alternative: AlternativeInterface) => {
  const response = await axios.post('/api/alternatives', alternative);
  return response.data;
};

export const updateAlternativeById = async (id: string, alternative: AlternativeInterface) => {
  const response = await axios.put(`/api/alternatives/${id}`, alternative);
  return response.data;
};

export const getAlternativeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/alternatives/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAlternativeById = async (id: string) => {
  const response = await axios.delete(`/api/alternatives/${id}`);
  return response.data;
};
