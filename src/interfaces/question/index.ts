import { AlternativeInterface } from 'interfaces/alternative';
import { DomainInterface } from 'interfaces/domain';
import { GetQueryInterface } from 'interfaces';

export interface QuestionInterface {
  id?: string;
  text: string;
  domain_id: string;
  created_at?: any;
  updated_at?: any;
  alternative?: AlternativeInterface[];
  domain?: DomainInterface;
  _count?: {
    alternative?: number;
  };
}

export interface QuestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  text?: string;
  domain_id?: string;
}
