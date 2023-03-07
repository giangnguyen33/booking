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
  constructor(id: number, from: string, to: string){
    this.id = id;
    this.from = new Date(from);
    this.to = new Date (to);
  }
} 

interface BookingCost extends Booking{
  isValid:boolean;
  cost:number;
}

