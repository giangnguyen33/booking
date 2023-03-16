import { calculateBookingsCost } from './costCalculator'
import input from './data/input.json'
import { Booking } from './models'
import fs from 'fs';

const bookings:Booking[] = input;
const path = "src/data/output.json";
try {

    fs.writeFileSync(path, JSON.stringify(calculateBookingsCost(bookings), null, 2), "utf8");
    console.log("Data successfully saved");
} catch (error) {
    console.log("An error has occurred ", error);
}
