import { calculateDurationInHour, isValidDuration, isValidTimeFormat } from "./dateTimeValidator";
import { Booking , BookingCost, RateType} from "./models";
import {  getRateType } from "./rates";

const hourlyRates = {
    [RateType.Day]: 38,
    [RateType.Night]: 42.93,
    [RateType.Sat]:  45.91,
    [RateType.Sun]:  60.85,
  };

type WorkingHours = { [K in RateType]?: number; }

const calculateWorkingHoursCost = (workingHours: WorkingHours): number =>{
    const keys = Object.keys(workingHours);
    var cost = 0;
    for (const [key, value] of  Object.entries(workingHours)) {
        cost += hourlyRates[key as  RateType] * value
    }
    return cost;
    
}
export const calculateBookingCost = (booking:Booking):BookingCost => {
    const {from, to} = booking;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const duration = calculateDurationInHour(fromDate, toDate);
    const isValid = isValidTimeFormat(fromDate) && isValidTimeFormat(toDate) && isValidDuration(duration);

    if (isValid) {
        const rateType = getRateType(fromDate, toDate);
        const workingHours  = {[rateType]: duration};
        const total = calculateWorkingHoursCost(workingHours);
        return {...booking, isValid, total};
    }   

    return {...booking, isValid, total:0};
}

export const calculateBookingsCost = (bookings: Booking[]): BookingCost[] => bookings.map(booking=>calculateBookingCost(booking))