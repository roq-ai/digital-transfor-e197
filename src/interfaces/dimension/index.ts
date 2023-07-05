import { DomainInterface } from 'interfaces/domain';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DimensionInterface {
  id?: string;
  name: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  domain?: DomainInterface[];
  organization?: OrganizationInterface;
  _count?: {
    domain?: number;
  };
}

export interface DimensionGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
