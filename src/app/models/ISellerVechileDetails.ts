import {
  IContact,
  IVechileConditionQuestionaire,
  IVechileDetailQuestionaire,
} from '../questionaire/questionsJson';
import { IQuestion } from './IQuestion';
import { IVechileData, IVechileModelDetails } from './IVechile';

export class ISellerVechileDetails {
  public carDetails!: IVechileModelDetails;
  public contact!: IContact;
  public vehicleDetails!: IVechileDetailQuestionaire;
  public vehicleCondition!: IVechileConditionQuestionaire;
}
