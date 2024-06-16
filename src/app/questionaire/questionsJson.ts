enum Questiontype {
  radio,
  text,
  DorpBown,
  MultiSelect,
}

export class IVechileDetailQuestionaire {
  constructor() {
    // this.vechileTransmissionType = '';
  }
  carTitle?: string;
  carLoan?: boolean;
  loanAmount?: string;
  mileage?: Number;
  color?: string;
  zipCode?: string;
  vechileTransmissionType?: string;
}
export class IContact {
  fullName?: string;
  email?: string;
  mobile?: string;
  zipCode?: string;
}

export class IVechileConditionQuestionaire {
  constructor() {
    this.externalConditions = new IVechileConditionExteriorQuestionaire();
  }
  doesCarDrive?: boolean;
  doesCarStart?: boolean;
  carEngineandTransmission?: boolean;
  doesCarHaveMechanicalIssues?: boolean;
  mechanicalIssues?: string;
  doesInteriorIntact?: boolean;

  //External Conditions

  externalConditions: IVechileConditionExteriorQuestionaire;
}
export class IVechileConditionExteriorQuestionaire {
  doesAllCarWheelInflated?: boolean;
  doesAllGlassorLightCracked?: boolean;
  doesBodyDamage?: boolean;
  doesBodyDamageSeverity?: string;
  noticeableDingsDentsScratches?: boolean;
  doesBodyPanelIntact?: boolean;
  doesAirbagsDeployedOrMissing?: boolean;
  // Did your [Make] ever suffer flood or fire damage?
  doesCarSufferedFloodorFireDamage?: boolean;
  // Is the interior of your [Make] intact?
}

export const CarTitleOptions: string[] = ['Clean', 'salvage', 'Rebuilt'];
export const CarTitleOwnership: string[] = ['Own', 'Lease', 'Re-finance'];
