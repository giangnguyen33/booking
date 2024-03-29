import { RateType } from "./models"
import { getRateType } from "./rates"

describe('rates test', ()=>{
   describe('getRateType test',()=>{

    it.each`
        from                           | to                             | expected  
        ${'2023-02-05T00:00:00+11:00'} | ${'2023-02-05T23:00:00+11:00'} | ${RateType.Sun} 
        ${'2023-02-05T00:00:00+11:00'} | ${'2023-02-06T00:00:00+11:00'} | ${RateType.Sun} 
        ${'2023-02-04T11:00:00+11:00'} | ${'2023-02-04T15:00:00+11:00'} | ${RateType.Sat}
        ${'2023-02-03T18:00:00+11:00'} | ${'2023-02-03T20:00:00+11:00'} | ${RateType.Day} 
        ${'2023-02-03T18:00:00+11:00'} | ${'2023-02-03T20:15:00+11:00'} | ${RateType.Night} 
        ${'2023-02-03T05:00:00+11:00'} | ${'2023-02-03T10:00:00+11:00'} | ${RateType.Night} 
        ${'2023-02-03T06:00:00+11:00'} | ${'2023-02-03T10:00:00+11:00'} | ${RateType.Day} 
      `('should return correct working hours with rate type',({from, to, expected})=>{
            const fromDate  = new Date(from)
            const toDate = new Date(to)
            expect(getRateType(fromDate, toDate)).toEqual(expected)
        })
   } ) 

})