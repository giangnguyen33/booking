import { calculateDurationInHour, isValidDuration, isValidTimeFormat } from "./dateTimeValidator";

describe('datetimeValidator test', ()=>{
    describe('isValidTimeFormat test',()=>{
        it.each`
        date         
        ${'2017-10-23T08:01:00+11:00'} 
        ${'2017-10-23T08:16:00+11:00'} 
        ${'2017-10-23T08:31:00+11:00'} 
        ${'2017-10-23T08:46:00+11:00'}
      `('should return  false when time is not in 15xtime format',({date})=>{
        const bookingDate = new Date(date);
        expect( isValidTimeFormat(bookingDate)).toBe(false);
      })

      it.each`
      date         
      ${'2017-10-23T08:00:00+11:00'} 
      ${'2017-10-23T08:15:00+11:00'} 
      ${'2017-10-23T08:30:00+11:00'} 
      ${'2017-10-23T08:45:00+11:00'}
    `('should return true when time is  in 15xtime format',({date})=>{
        const bookingDate = new Date(date);
        expect( isValidTimeFormat(bookingDate)).toBe(true);
    })
    })

    describe('calculateDurationInHour test', ()=>{
        it.each`
        from | to| hours         
        ${'2017-10-23T08:00:00+11:00'} |  ${'2017-10-23T09:00:00+11:00'} |  ${1}
        ${'2017-10-23T08:15:00+11:00'} |  ${'2017-10-24T08:15:00+11:00'} | ${24}
        ${'2017-10-20T09:00:00+11:00'} |  ${'2017-10-20T11:45:00+11:00'} | ${2.75}
        ${'2017-10-23T08:45:00+11:00'} |  ${'2017-10-23T11:45:00+11:00'} | ${3}
      `('should convert booking time to hours',({from, to, hours})=>{
        const bookingFrom = new Date(from);
        const bookingTo = new Date(to);
        expect(calculateDurationInHour(bookingFrom, bookingTo)).toBe(hours);
      })
    })

    describe('isValidDuration test', ()=>{
      it.each`
        duration    | expected  
        ${-0.75}     |  ${false}  
        ${0.75}     |  ${false}
        ${1}        |  ${true}
        ${24}        |  ${true}
        ${24.25}        |  ${false}
      `('should return $expected when duration is $duration',({duration, expected})=>{
        expect(isValidDuration(duration)).toBe(expected)
      })
      
    })
})