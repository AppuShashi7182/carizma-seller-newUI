import { Injectable } from '@angular/core';
import { IVechileData } from '../models/IVechile';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
import { IState } from '../models/IState';
import { Observable, map, of } from 'rxjs';
import { CacheKey, cacheUtil } from '../utilities/localStorageUtility';
import { NHTSAService } from './nhtsa-service';

@Injectable({
  providedIn: 'root',
})
export class CommondataSellService {
  public vin: string = '';
  public seller: ISellerVechileDetails | undefined;
  public selectedVechileDetails: IVechileData | undefined;

  constructor(public _service: NHTSAService) {}

  getUSStates(): Observable<string[]> {
    let stateDataFromCache = localStorage.getItem(CacheKey.States);

    if (stateDataFromCache && stateDataFromCache.length > 0) {
      let states: string[] = JSON.parse(stateDataFromCache);
      return of(states);
    }

    //  this._dataService.getUSStates().
    return this._service.getStates().pipe(
      map((val) => {
        return val.map((v) => v.code);
      })
    );
  }
}
