import axios from 'axios';
import queryString from 'query-string';
import { DomainInterface, DomainGetQueryInterface } from 'interfaces/domain';
import { GetQueryInterface } from '../../interfaces';

export const getDomains = async (query?: DomainGetQueryInterface) => {
  const response = await axios.get(`/api/domains${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDomain = async (domain: DomainInterface) => {
  const response = await axios.post('/api/domains', domain);
  return response.data;
};

export const updateDomainById = async (id: string, domain: DomainInterface) => {
  const response = await axios.put(`/api/domains/${id}`, domain);
  return response.data;
};

export const getDomainById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/domains/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDomainById = async (id: string) => {
  const response = await axios.delete(`/api/domains/${id}`);
  return response.data;
};
