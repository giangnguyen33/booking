import { Booking, RateType } from "./models";

const isValidTimeFormat = (time:Date): boolean =>time.getMinutes()%15 == 0

const calculateDurationInHour = (from:Date, to:Date): number => (to.valueOf() - from.valueOf())/(60000*60);

const isValidDuration = (duration:number):boolean => duration >= 1 && duration <= 24

export const calculateCost = (booking:Booking) => {
    const {from, to} = booking;
    const duration = calculateDurationInHour(from, to);
    const isValid = isValidTimeFormat(from) && isValidTimeFormat(to) && isValidDuration(duration)
    return {...booking, isValid};
}