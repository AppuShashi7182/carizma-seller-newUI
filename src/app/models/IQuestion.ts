import { Questiontype } from './Questiontype';

export class IQuestion {
  constructor() {}
  id: Number | undefined;
  name: string | undefined;
  title: String | undefined;
  options: string[] | undefined;
  answer: String | undefined;
  type: Questiontype | undefined;
  isRequired: boolean | undefined;
  isHidden: boolean | undefined;
}
