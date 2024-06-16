import { IState } from '../models/IState';

export const StateData: IState[] = [
  {
    name: 'Alabama',
    code: 'AL',
  },
  {
    name: 'Alaska',
    code: 'AK',
  },
  {
    name: 'American Samoa',
    code: 'AS',
  },
  {
    name: 'Arizona',
    code: 'AZ',
  },
  {
    name: 'Arkansas',
    code: 'AR',
  },
  {
    name: 'California',
    code: 'CA',
  },
  {
    name: 'Colorado',
    code: 'CO',
  },
  {
    name: 'Connecticut',
    code: 'CT',
  },
  {
    name: 'Delaware',
    code: 'DE',
  },
  {
    name: 'District Of Columbia',
    code: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    code: 'FM',
  },
  {
    name: 'Florida',
    code: 'FL',
  },
  {
    name: 'Georgia',
    code: 'GA',
  },
  {
    name: 'Guam',
    code: 'GU',
  },
  {
    name: 'Hawaii',
    code: 'HI',
  },
  {
    name: 'Idaho',
    code: 'ID',
  },
  {
    name: 'Illinois',
    code: 'IL',
  },
  {
    name: 'Indiana',
    code: 'IN',
  },
  {
    name: 'Iowa',
    code: 'IA',
  },
  {
    name: 'Kansas',
    code: 'KS',
  },
  {
    name: 'Kentucky',
    code: 'KY',
  },
  {
    name: 'Louisiana',
    code: 'LA',
  },
  {
    name: 'Maine',
    code: 'ME',
  },
  {
    name: 'Marshall Islands',
    code: 'MH',
  },
  {
    name: 'Maryland',
    code: 'MD',
  },
  {
    name: 'Massachusetts',
    code: 'MA',
  },
  {
    name: 'Michigan',
    code: 'MI',
  },
  {
    name: 'Minnesota',
    code: 'MN',
  },
  {
    name: 'Mississippi',
    code: 'MS',
  },
  {
    name: 'Missouri',
    code: 'MO',
  },
  {
    name: 'Montana',
    code: 'MT',
  },
  {
    name: 'Nebraska',
    code: 'NE',
  },
  {
    name: 'Nevada',
    code: 'NV',
  },
  {
    name: 'New Hampshire',
    code: 'NH',
  },
  {
    name: 'New Jersey',
    code: 'NJ',
  },
  {
    name: 'New Mexico',
    code: 'NM',
  },
  {
    name: 'New York',
    code: 'NY',
  },
  {
    name: 'North Carolina',
    code: 'NC',
  },
  {
    name: 'North Dakota',
    code: 'ND',
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MP',
  },
  {
    name: 'Ohio',
    code: 'OH',
  },
  {
    name: 'Oklahoma',
    code: 'OK',
  },
  {
    name: 'Oregon',
    code: 'OR',
  },
  {
    name: 'Palau',
    code: 'PW',
  },
  {
    name: 'Pennsylvania',
    code: 'PA',
  },
  {
    name: 'Puerto Rico',
    code: 'PR',
  },
  {
    name: 'Rhode Island',
    code: 'RI',
  },
  {
    name: 'South Carolina',
    code: 'SC',
  },
  {
    name: 'South Dakota',
    code: 'SD',
  },
  {
    name: 'Tennessee',
    code: 'TN',
  },
  {
    name: 'Texas',
    code: 'TX',
  },
  {
    name: 'Utah',
    code: 'UT',
  },
  {
    name: 'Vermont',
    code: 'VT',
  },
  {
    name: 'Virgin Islands',
    code: 'VI',
  },
  {
    name: 'Virginia',
    code: 'VA',
  },
  {
    name: 'Washington',
    code: 'WA',
  },
  {
    name: 'West Virginia',
    code: 'WV',
  },
  {
    name: 'Wisconsin',
    code: 'WI',
  },
  {
    name: 'Wyoming',
    code: 'WY',
  },
];
export const getAllMakes_URL = (year: Number) =>
  `/carizma/seller/vehicle-info/make?year=${year}`;
export const getAllModel_URL = (year: Number, make: string) =>
  `/carizma/seller/vehicle-info/model?year=${year}&make=${make}`;
export const getAlltrim_URL = (year: Number, make: string, model: string) =>
  `/carizma/seller/vehicle-info/trim?year=${year}&make=${make}&model=${model}`;

export const getVechileDetailssByLicenseNumberURL = (
  registerationNumber: string,
  state: string
) => `/carizma/seller/licenseplatedata?plate=${registerationNumber}&state=${state}`;
export const getlocalhostURL = (registerationNumber: string, state: string) =>
  `http://localhost:3000/carizma/consumer-api/MOHAMAD-LPDHNQA4M/${state}/${registerationNumber}`;

export const getAllState_URL = () => `/carizma/seller/us-states-region`;
export const getSellerOffer_URL = () => `/carizma/seller/instant-offer`;
export const getRequestOffer_URL = () => `/carizma/seller/acceptance-status`;
export const getSellerVehicleInfo_URL = () => `/carizma/seller/seller-vehicle-info`;
export const getSellerVehicleCompleteInfo_URL = () => `/carizma/seller/seller-vehicle-complete-info`;
export const getProfileInfo_URL = () => `/carizma/seller/profile-info`;
export const updateProfileInfo_URL = () => `/carizma/seller/update-profile-info`;
export const sendEmail_URL = () => `/carizma/seller/sendEmail`;
export const salesForceAPI_URL = () => `/carizma/seller/upsert-salesForce-record`;

//localhost:3000/carizma/vehicle-info/make/200
export const VechileYears: Number[] = [
  1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
  2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
  2017, 2018, 2019, 2020, 2021, 2022, 2023,2024
];


export const contact_title = 'Personalized Offer Coming Soon!'
export const conatc_message = 'Carizma Customer Team will follow up with you to provide a better offer.'
export const accept_title = 'Congratulations!'
export const accept_message = 'Thanks for accepting the offer'