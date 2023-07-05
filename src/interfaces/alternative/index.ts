import { QuestionInterface } from 'interfaces/question';
import { GetQueryInterface } from 'interfaces';

export interface AlternativeInterface {
  id?: string;
  text: string;
  question_id: string;
  created_at?: any;
  updated_at?: any;

  question?: QuestionInterface;
  _count?: {};
}

export interface AlternativeGetQueryInterface extends GetQueryInterface {
  id?: string;
  text?: string;
  question_id?: string;
}
