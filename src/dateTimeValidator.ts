export const isValidTimeFormat = (time:Date): boolean =>time.getMinutes()%15 == 0

export const calculateDurationInHour = (from:Date, to:Date): number => (to.valueOf() - from.valueOf())/(60000*60);

export const isValidDuration = (duration:number):boolean => duration >= 1 && duration <= 24

