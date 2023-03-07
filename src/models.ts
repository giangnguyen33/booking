export enum RateType {
    Day = 'Day',
    Night = 'Night',
    Sat = 'Sat',
    Sun = 'Sun',
  }

export class Booking {
  id:number;
  from:string;
  to:string;
  constructor(id: number, from: string, to: string){
    this.id = id;
    this.from = from;
    this.to =  to;
  }
} 

export interface BookingCost extends Booking{
  isValid:boolean;
  total:number;
}

