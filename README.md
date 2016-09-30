### Welcome to Timestamp Microservice

The first Free Code Camp back end developement project.

This app converts Unix timestamp to natural language date and vice versa.
- Enter a date string after this pages's url and press enter, and you will see the result.
- The result is a JSON object with two keys: Natural and Unix. 
- An invalid date string entered by the user will result in "null" for both Unix and Natural keys.
Examples

The follwing shows url entered and the expected result.

url
`http://amer-timestamp-service.herokuapp.com/january 15 2014`

or 
`http://amer-timestamp-service.herokuapp.com/jan 15 2014`

or 
`http://amer-timestamp-service.herokuapp.com/1 15 2014`

result
`{"Unix":1389744000,"Natural":"January 15, 2014"}`


url
`http://amer-timestamp-service.herokuapp.com/1468969200`
result
`{"Unix":1468969200,"Natural":"July 20, 2016"}`

url
`http://amer-timestamp-service.herokuapp.com/not a date`
result
`{"Unix":null,"Natural":null}`
