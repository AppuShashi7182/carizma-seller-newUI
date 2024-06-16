import { Injectable } from '@angular/core';
import { StateData } from '../constants.ts/constants';
import { IState } from '../models/IState';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  public getStates(): IState[] {
    return StateData;
  }
}
