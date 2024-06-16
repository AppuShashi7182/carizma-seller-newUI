export class IVechileModelDetails {
  year?: Number;
  make?: string;
  model?: string;
  trim?: string;
  vin?: string;
  plateNumber?: string;
  state?: string;
}
interface IVechileLicense {
  plateNumber: string;
  stateCode: string;
}

export interface IVechileLicenseData {
  licensePlateLookup: IVechileModelDetails;
}

export interface IVechileData {
  ModelYear: string;
  Make?: string;
  Model?: string;
  ErrorCode?:string;
}

export interface IOfferData {
  seller_id: number;
  vehicle_id: number;
  instant_offer_price: number;
}

export class IOfferStatusData {
  seller_id?: number;
  vehicle_id?: number;
  acceptance_status?: string;
}
