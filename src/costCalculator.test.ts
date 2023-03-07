import { calculateBookingCost, calculateBookingsCost } from "./costCalculator"
import { Booking } from "./models"

describe('cost-calculator test', ()=>{
    describe('validate booking time', ()=>{
   
        it.each`
        from | to          
        ${'2017-10-23T08:01:00+11:00'} |  ${'2017-10-23T11:00:00+11:00'}
        ${'2017-10-23T08:16:00+11:00'} |  ${'2017-10-23T11:15:00+11:00'}
        ${'2017-10-23T08:31:00+11:00'} |  ${'2017-10-23T11:30:00+11:00'}
        ${'2017-10-23T08:46:00+11:00'} |  ${'2017-10-23T11:45:00+11:00'}
        ${'2017-10-23T08:00:00+11:00'} |  ${'2017-10-23T11:01:00+11:00'}
        ${'2017-10-23T08:15:00+11:00'} |  ${'2017-10-23T11:16:00+11:00'}
        ${'2017-10-23T08:30:00+11:00'} |  ${'2017-10-23T11:31:00+11:00'}
        ${'2017-10-23T08:45:00+11:00'} |  ${'2017-10-23T11:46:00+11:00'}  
      `('should return isValid is false when time is not in 15xtime format',({from, to})=>{
        const booking = new Booking(1,from,to)
        const result = calculateBookingCost(booking);
        expect(result.isValid).toBe(false);
        expect(result.total).toBe(0);
      })

      it('should return isValid is false when end time before start time', ()=>{
        const booking = new Booking(1, '2017-10-23T12:00:00+11:00','2017-10-23T11:00:00+11:00')
        const result = calculateBookingCost(booking);
        expect(result.isValid).toBe(false);
        expect(result.total).toBe(0);
      })

      it('should return isValid is false when booking duration less than 1 hour', ()=>{
        const booking = new Booking(1,'2017-10-23T11:00:00+11:00','2017-10-23T11:15:00+11:00')
        const result = calculateBookingCost(booking);
        expect(result.isValid).toBe(false);
        expect(result.total).toBe(0);
      })

      it('should return isValid is false when booking duration more than 24 hours', ()=>{
        const booking = new Booking(1,'2017-10-23T11:00:00+11:00', '2017-10-24T11:15:00+11:00')
        const result = calculateBookingCost(booking);
        expect(result.isValid).toBe(false);
        expect(result.total).toBe(0);
      })

      it.each`
        from | to          
        ${'2017-10-23T08:00:00+11:00'} |  ${'2017-10-23T09:00:00+11:00'}
        ${'2017-10-23T08:15:00+11:00'} |  ${'2017-10-24T08:15:00+11:00'}
        ${'2017-10-20T09:00:00+11:00'} |  ${'2017-10-20T11:45:00+11:00'}
        ${'2017-10-23T08:45:00+11:00'} |  ${'2017-10-23T11:45:00+11:00'}
      `('should return isValid is true when booking datetimes are valid',({from, to})=>{
        const booking = new Booking(1,from, to)
        const result = calculateBookingCost(booking);
        expect(result.isValid).toBe(true);
      })
      
    })

    describe('calculate total cost of one booking', ()=>{ 
        it.each`
        from                           | to                              |total
        ${'2023-02-05T00:00:00+11:00'} | ${'2023-02-05T23:00:00+11:00'} | ${60.85*23} 
        ${'2023-02-05T00:00:00+11:00'} | ${'2023-02-06T00:00:00+11:00'} | ${60.85*24} 
        ${'2023-02-04T11:00:00+11:00'} | ${'2023-02-04T15:00:00+11:00'} | ${45.91*4}
        ${'2017-10-23T08:00:00+11:00'} | ${'2017-10-23T11:00:00+11:00'} | ${38*3} 
        ${'2023-02-03T18:00:00+11:00'} | ${'2023-02-03T20:15:00+11:00'} | ${42.93*2.25} 
        ${'2023-02-03T05:00:00+11:00'} | ${'2023-02-03T10:00:00+11:00'} | ${42.93*5} 
        ${'2017-10-20T09:00:00+11:00'} | ${'2017-10-20T11:45:00+11:00'} | ${38*2.75}
      `('should return isValid is true when booking datetimes are valid',({from, to, total})=>{
        const booking = new Booking(1,from, to)
        const result = calculateBookingCost(booking);
        expect(result.isValid).toBe(true);
        expect(result.total).toBe(total);
      })
    })

    describe('calculate cost of list of bookings', ()=>{
        const booking1 = new Booking(1,'2017-10-23T08:00:00+11:00','2017-10-23T11:00:00+11:00')
        const booking2 = new Booking(2,'2017-10-20T09:00:00+11:00','2017-10-20T11:45:00+11:00')
    
        const bookings: Booking[] = [booking1, booking2 ]
        
        const expectedBooking1 = {...booking1, isValid:true, total:114}
        const expectedBooking2 = {...booking2, isValid:true, total:104.50}

        const bookingsCost = calculateBookingsCost(bookings);
        expect(bookingsCost).toEqual([expectedBooking1, expectedBooking2]);
    })
})