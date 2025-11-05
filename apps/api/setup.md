# flight portal (httpservice)

## Headers

x-api-key: airline.token

> if skyteam miles is available & if token is valid
> GET /status

## Flight Management

GET /flight/fetchUpcomingFlights -> return flights under airline including brand for the flight
POST /flight/[id]/serverStart # sets startedAt
POST /flight/[id]/tick # usually sent every 1 minute - this is to check if the server is still alive. if it hasnt responded in 5 minutes then the flight must auto finish
POST /flight/[id]/serverEnd -> sets endTime

## Product Data

GET /airline -> return airline data excluding token
GET /airline/fetchProductsData -> return airline's products

## User Data

POST /users/fetchUsersData
POST /user/[id]/buyProduct
