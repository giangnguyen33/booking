export enum RateType {
    Day = 'Day',
    Night = 'Night',
    Sat = 'Sat',
    Sun = 'Sun',
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
  cost?:number;
}

