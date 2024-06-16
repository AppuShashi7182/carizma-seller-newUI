export class ProfileInfoObject {
  seller_id: number = 0;
  email_id: string = '';
  customer_contact_number: string ='';
  charity_name: string = '';
  donor_email: string = '';
  customer_name: string ='';
  vehicle_owner_name: string ='';
  payee_name: string = '';
  location_type: string = '';
  apt_number: string = '';
  street_address_line1: string = '';
  street_address_line2: string = '';
  city: string ='';
  zip_code: string = '';
}

export interface ISellerVehicle {
  seller_id: number;
  vehicle_id: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  vin: string;
  plate_number: string;
  mileage: string;
  instant_offer_price: string;
  acceptance_status: string;
  email_id: string;
  contact_number: string;
  customer_name: string;
}

export interface IBuyerDetails {
  name: string;
  email: string;
  subject: string;
  message: string;
}

