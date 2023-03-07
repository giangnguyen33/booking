export enum RateType {
    Day,
    Night,
    Sat,
    Sun,
  }

export class Booking {
  id:number;
  from:Date;
  to:Date;
  constructor(id: number, from: Date, to: Date){
    this.id = id;
    this.from = from;
    this.to = to;
  }
} 

interface BookingCost extends Booking{
  isValid:boolean;
  cost:number;
}

export const hourlyRates = {
  [RateType.Day]: 38,
  [RateType.Night]: 42.93,
  [RateType.Sat]:  45.91,
  [RateType.Sun]:  60.85,
};

export const timetable = {
  [RateType.Day]: {from:"0600", to: "2000"},
  [RateType.Night]: {from:"2000", to: "0600"},
  [RateType.Sat]:  {from:"0000", to: "2345"},
  [RateType.Sun]:  {from:"0000", to: "2345"},
};
