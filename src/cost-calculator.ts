import { calculateDurationInHour, isValidDuration, isValidTimeFormat } from "./dateTimeValidator";
import { Booking } from "./models";
import { calculateWorkingHoursCost, getRateType } from "./rates";

export const calculateCost = (booking:Booking) => {
    const {from, to} = booking;
    const duration = calculateDurationInHour(from, to);
    const isValid = isValidTimeFormat(from) && isValidTimeFormat(to) && isValidDuration(duration)
    if (!isValid) {
        return {...booking, isValid};
    } else {
        const rateType = getRateType(from, to);
        const workingHours  = {[rateType]: duration};
        const total = calculateWorkingHoursCost(workingHours);
        return {...booking, isValid, total};
    }
}