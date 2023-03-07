import { calculateBookingsCost } from './cost-calculator'
import input from './input.json'
import { Booking } from './models'

const bookings:Booking[] = input.map(booking => new Booking(booking.id, booking.from, booking.to));

console.log(calculateBookingsCost(bookings))