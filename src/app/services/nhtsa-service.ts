import { Injectable } from '@angular/core';
import { DecodeVinValues } from '@shaggytools/nhtsa-api-wrapper';
import {
  IOfferData,
  IOfferStatusData,
  IVechileData,
  IVechileLicenseData,
} from '../models/IVechile';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  getAllMakes_URL,
  getAllModel_URL,
  getAllState_URL,
  getAlltrim_URL,
  getRequestOffer_URL,
  getSellerOffer_URL,
  getVechileDetailssByLicenseNumberURL,
  getSellerVehicleInfo_URL,
  getSellerVehicleCompleteInfo_URL,
  updateProfileInfo_URL,
  getProfileInfo_URL,
  getlocalhostURL,
  sendEmail_URL,
  salesForceAPI_URL,
} from '../constants.ts/constants';
import { IMake, IState } from '../models/IState';
import { ISellerVechileDetails } from '../models/ISellerVechileDetails';
import { IBuyerDetails, ISellerVehicle, ProfileInfoObject } from '../models/ISellVechile';
import { TokenStorageService } from './TokenStorageService';

@Injectable({
  providedIn: 'root',
})
export class NHTSAService {
  // getVechileDetailssByLicenseNumberURL(numberPlat: string,state:string) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(private http: HttpClient, private token: TokenStorageService) {}

  async getVechileDetailsByVIN(vin: string): Promise<IVechileData> {
    // const results = await DecodeVinValues('WA1A4AFY2J2008189');
    const { Results } = await DecodeVinValues(vin);
    const decodedVehicle = Results[0];

    let data: IVechileData = decodedVehicle;

    return data;
  }

  getMakes(year: Number): Observable<string[]> {
    return this.http.get<string[]>(environment.apiURL + getAllMakes_URL(year));
  }

  getAllMakes(year: Number): Observable<IMake[]> {
    return this.http.get<IMake[]>(environment.apiURL + getAllMakes_URL(year));
  }

  getModel(year: Number, make: string): Observable<string[]> {
    return this.http.get<string[]>(
      environment.apiURL + getAllModel_URL(year, make)
    );
  }

  getTrim(year: Number, make: string, model: string): Observable<string[]> {
    console.log(model);
    return this.http.get<string[]>(
      environment.apiURL + getAlltrim_URL(year, make, model)
    );
  }

  getStates(): Observable<IState[]> {
    console.log('url',environment.apiURL + getAllState_URL());
    return this.http.get<IState[]>(environment.apiURL + getAllState_URL());
  }

  getVechileDetailsByRegistrationDetails(
    licensePlate: string,
    state: string
  ): Observable<IVechileLicenseData> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      }),
    };
    return this.http.get<IVechileLicenseData>(
      environment.apiURL +
        getVechileDetailssByLicenseNumberURL(licensePlate, state),
      httpOptions
    );
  }

  getInstantOffer(
    sellerCompleteDetails: ISellerVechileDetails
  ): Observable<IOfferData> {
    console.log('Here before api call DoesInteriorIntact :', sellerCompleteDetails);
    return this.http.post<IOfferData>(
      environment.apiURL + getSellerOffer_URL(),
      sellerCompleteDetails
    );
  }

  getHeaders(): any {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      Authorization: `Bearer ${this.token.getToken()}`,
    });
    const httpOptions = {
      headers: headers,
    };
    return httpOptions;
  }

  RequestOffer(offerData: IOfferStatusData): Observable<IOfferData> {
    return this.http.put<IOfferData>(
      environment.apiURL + getRequestOffer_URL(),
      offerData
    );
  }
  getSellerVehicleDetails(): Observable<ISellerVehicle[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        Authorization: `Bearer ${this.token.getToken()}`,
      }),
    };

    return this.http.post<ISellerVehicle[]>(
      environment.apiURL + getSellerVehicleInfo_URL(),
      { email_id: this.token.getEMail() }
    );
  }

  getSellerCompleteDetails(
    sellerId: number,
    vehicleid: number
  ): Observable<any> {
    let data = { seller_id: sellerId, vehicle_id: vehicleid };
    return this.http.post<any>(
      environment.apiURL + getSellerVehicleCompleteInfo_URL(),
      data
    );
  }
 

  getUserProfileDetails(): Observable<ProfileInfoObject> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        Authorization: `Bearer ${this.token.getToken()}`,
      }),
    };

    return this.http.post<ProfileInfoObject>(
      environment.apiURL + getProfileInfo_URL(), { email_id: this.token.getEMail() }
    );
  }

  updateUserProfileDetails(sellerInfo: ProfileInfoObject): Observable<ProfileInfoObject> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        Authorization: `Bearer ${this.token.getToken()}`,
      }),
    };
    return this.http.put<ProfileInfoObject>(
      environment.apiURL + updateProfileInfo_URL(),sellerInfo     
    );
  }

  updateSalesForceDetails(
    sellerId: number,
    vehicleId: number
  ): Observable<any> {
    let data = { sellerId: sellerId, vehicleId: vehicleId };
    return this.http.post<any>(
      environment.apiURL + salesForceAPI_URL(),
      data
    );
  }

  submitUserDetails(userDetails:IBuyerDetails): Observable<IBuyerDetails> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        Authorization: `Bearer ${this.token.getToken()}`,
      }),
    };
    return this.http.put<IBuyerDetails>(
      environment.apiURL + sendEmail_URL(),userDetails     
    );
  }
}
