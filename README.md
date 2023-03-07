# Booking cost caculator

The application should read a collection of bookings from a provided JSON
file, calculate the cost of each booking and write the result to a new  JSON file

- Deposit, withdraw and maintain a balance for multiple customers
- Return a customer’s balance and the bank’s total balance
- Prevent customers from withdrawing more money than they have in their account

## Assumptions
-  Booking datetime is correct format because with limit time, I don't implement validate format datetime
- Booking not cross 2 days for simply calculation with limit time of assigment. I think about the scenarios os booking time cross 2 days but it's not mention in the requirement.
-  The minimum booking time is 1 hour
-  The maximum booking time is 24 hours
-  A booking cannot end before it has started
- A booking can be booked in 15 min increments e.g. 1600 to 1715
- If any part of a booking is charged at the night rate, the whole booking is charged at the night rate
- Saturday and Sunday rates apply across the whole day, there’s no distinc-
tion between day and night

## Solution and design
- Console application allows read data from input.json file and calculate the cost of each booking and write the result to output.json file

## Tools and setup

- Download Visual Studio Code or any IDE for Javascript (https://code.visualstudio.com/)
- Install NodeJS

## Run the app
- Open booking folder
- Run $yarn to install all dependencies
- Sample data in data/input.json. If you want to add more sample data, you can add more records in the input file
- From terminal run $yarn start, the data will be written to output.json file

## Run the tests
- The test cases are under *test.ts files
- To run the tests, from terminal run $yarn test

