import { calculateCost } from "./cost-calculator"
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
        const booking = new Booking(1,new Date(from), new Date(to))
        const result = calculateCost(booking);
        expect(result.isValid).toBe(false);
      })

      it('should return isValid is false when end time before start time', ()=>{
        const booking = new Booking(1,new Date('017-10-23T12:00:00+11:00'), new Date('2017-10-23T11:00:00+11:00'))
        const result = calculateCost(booking);
        expect(result.isValid).toBe(false);
      })

      it('should return isValid is false when booking duration less than 1 hour', ()=>{
        const booking = new Booking(1,new Date('2017-10-23T11:00:00+11:00'), new Date('2017-10-23T11:15:00+11:00'))
        const result = calculateCost(booking);
        expect(result.isValid).toBe(false);
      })

      it('should return isValid is false when booking duration more than 24 hours', ()=>{
        const booking = new Booking(1,new Date('2017-10-23T11:00:00+11:00'), new Date('2017-10-24T11:15:00+11:00'))
        const result = calculateCost(booking);
        expect(result.isValid).toBe(false);
      })

      it.each`
        from | to          
        ${'2017-10-23T08:00:00+11:00'} |  ${'2017-10-23T09:00:00+11:00'}
        ${'2017-10-23T08:15:00+11:00'} |  ${'2017-10-24T08:15:00+11:00'}
        ${'2017-10-20T09:00:00+11:00'} |  ${'2017-10-20T11:45:00+11:00'}
        ${'2017-10-23T08:45:00+11:00'} |  ${'2017-10-23T11:45:00+11:00'}
      `('should return isValid is true when booking datetimes are valid',({from, to})=>{
        const booking = new Booking(1,new Date(from), new Date(to))
        const result = calculateCost(booking);
         expect(result.isValid).toBe(true);
      })
      
    })
})