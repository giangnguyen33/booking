import { calculateDurationInHour, isValidDuration, isValidTimeFormat } from "./dateTimeValidator";
import { Booking } from "./models";


export const calculateCost = (booking:Booking) => {
    const {from, to} = booking;
    const duration = calculateDurationInHour(from, to);
    const isValid = isValidTimeFormat(from) && isValidTimeFormat(to) && isValidDuration(duration)
    return {...booking, isValid};
}

