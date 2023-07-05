import { QuestionInterface } from 'interfaces/question';
import { DimensionInterface } from 'interfaces/dimension';
import { GetQueryInterface } from 'interfaces';

export interface DomainInterface {
  id?: string;
  name: string;
  dimension_id: string;
  created_at?: any;
  updated_at?: any;
  question?: QuestionInterface[];
  dimension?: DimensionInterface;
  _count?: {
    question?: number;
  };
}

export interface DomainGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  dimension_id?: string;
}
