import { RateType } from "./models";

const isNightShift = (from:Date, to:Date): boolean =>{
    const hourFrom = from.getHours();
    const hourTo = to.getHours();
    const minuteTo = to.getMinutes();
    if( (hourTo >= 20 && minuteTo>0) || hourFrom < 6)
    {
        return true;
    }
    return false;
}

export const getRateType =  (from:Date, to:Date): RateType =>{
    const dayFrom = from.getDay();
    switch (dayFrom) {
        case 0:
            return RateType.Sun;
        case 6:
            return RateType.Sat;
        default: 
           {
             if(isNightShift(from, to)) {
                return RateType.Night;
             } 
             return RateType.Day
           }
    }
}

const hourlyRates = {
    [RateType.Day]: 38,
    [RateType.Night]: 42.93,
    [RateType.Sat]:  45.91,
    [RateType.Sun]:  60.85,
  };

type WorkingHours = { [K in RateType]?: number; }

export const calculateWorkingHoursCost = (workingHours: WorkingHours): number =>{
    const keys = Object.keys(workingHours);
    var cost = 0;
    for (const [key, value] of  Object.entries(workingHours)) {
        cost += hourlyRates[key as  RateType] * value
    }
    return cost;
    
}