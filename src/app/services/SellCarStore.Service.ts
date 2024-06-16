import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
// import { QuestionaireVechileConditionDetails } from '../questionaire/vechile-condition-Json';
import { IVechileModelDetails } from '../models/IVechile';
import {
  IContact,
  IVechileConditionExteriorQuestionaire,
  IVechileConditionQuestionaire,
  IVechileDetailQuestionaire,
} from '../questionaire/questionsJson';

@Injectable({ providedIn: 'root' })
export class SellCarStoreService {
  // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addTodo, removeTodo, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  // private readonly _todos = new BehaviorSubject<IQuestion[]>([]);

  sellerCompleteDetails: ISellerVechileDetails;
  // Expose the observable$ part of the _todos subject (read only stream)
  // readonly todos$ = this._todos.asObservable();

  constructor() {
    this.sellerCompleteDetails = new ISellerVechileDetails();
    this.loadSellerDetails();
  }
  // the getter will return the last value emitted in _todos subject
  // get todos(): IQuestion[] {
  //   return this._todos.getValue();
  // }

  loadSellerDetails() {
    this.sellerCompleteDetails.carDetails = new IVechileModelDetails();

    this.sellerCompleteDetails.contact = new IContact();
    this.sellerCompleteDetails.vehicleCondition =
      new IVechileConditionQuestionaire();
    this.sellerCompleteDetails.vehicleDetails =
      new IVechileDetailQuestionaire();
    // all wheels inflate default yes
    // car search box -center done
    // body panels intact-yes done
    // interrior intact-yes  deafult values
    //Additional default values

    
    // this.sellerCompleteDetails.vehicleCondition.DoesInteriorIntact = true;
    // this.sellerCompleteDetails.vehicleCondition.externalConditions.doesBodyPanelIntact =
    //   true;
    // this.sellerCompleteDetails.vehicleCondition.externalConditions.doesAllCarWheelInflated =
    //   true;
  }

  setCurrentSellVechileDetails(vechileDetails: IVechileModelDetails) {
    //To reset previous collections
    this.loadSellerDetails();
    this.sellerCompleteDetails.carDetails = vechileDetails;
  }
  // assigning a value to this.todos will push it onto the observable
  // and down to all of its subsribers (ex: this.todos = [])
}
