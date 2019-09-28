# WayFarer-V2
[![License Badge](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/StevenDerrick/WayFarer-V2/branch/develop/graph/badge.svg)](https://codecov.io/gh/StevenDerrick/WayFarer-V2)
[![Maintainability](https://api.codeclimate.com/v1/badges/109305e446e29a17dd14/maintainability)](https://codeclimate.com/github/StevenDerrick/WayFarer-V2/maintainability)
[![Build Status](https://travis-ci.org/StevenDerrick/WayFarer-V2.svg?branch=develop)](https://travis-ci.org/StevenDerrick/WayFarer-V2)
[![Coverage Status](https://coveralls.io/repos/github/StevenDerrick/WayFarer-V2/badge.svg?branch=develop)](https://coveralls.io/github/StevenDerrick/WayFarer-V2?branch=develop&kill_cache=1)
[![Contributors](https://img.shields.io/badge/contributors-1-orange.svg?style=flat-square)]()


# Way-Farer
> Wayfarer is an online Public bus transportation service.

### Motivation

Internet has solved many day to day problems. One of those problems was a big number of people standing in front of a travel agency office booking tickets for their picnics and vacation. WAYFARER web services help you in that occasion and make things easy for you in a short time. You can use this service to book any public bus service and make your vacation a reality.
### Gh-pages and heroku app links
Way-Farer front end is hosted on gh-pages [Way-Farer UI](http://stevenderrick.github.io/Way-Farer) and the backend is on Heroku [Way-Farer API](https://thewayfarer-app.herokuapp.com/)

### Framework and Technologies used
*Built with*
* [Nodejs](https://www.nodejs.org)
* [Expressjs](https://www.expressjs.com)

*API end-points tested by*
* [Mocha](https://www.mochajs.org) & [Chai](chaijs.com)
* [Postman](https://www.getpostman.com)

*Continuous Integration and test coverage by*
* [Travis Ci](https://www.travis-ci.org) for CI
* [Coveralls](https://www.coveralls.io) for test coverage

### Features
- Finding all available trips
- Booking a particular trip
- User can see all their bookings
- User can delete their bookings
- Users are able to sign in and sign out
- Admin can create a new trip
- Admin can see all available trips
- Admin can cancel a particular trip

### How to use?
You can access the app by passing through this link [Way-Farer Website](http://stevenderrick.github.io/Way-Farer) and then navigate through the website. You can now use its different features.

For API endpoints, You can access them by accessing [Way-Farer API](https://thewayfarer-app.herokuapp.com/api/v1/trips) and consume them using POSTMAN.

### Installation
Clone this repo locally to access the source codes
```
$ git clone https://github.com/StevenDerrick/Way-Farer.git
$ cd ./Way-Farer
$ npm install
```
To start the application run `npm run dev` or use [Nodemon](https://www.nodemon.io) for restarting server on save.

#### Endpoints to create, views available products and create sale records
*HTTP Method*|*End point* | *Public Access*|*Action*
:----------|:---------|:------------:|:-----
POST | /v1/auth/signup | true | Create a user in the database
POST | /v1/auth/signin | true | User can sign in the API
GET | /v1/trips | true | Fetch all trips​ records
GET | /v1/trips/<trip_id> | true | Fetch a specific ​ trip​ record
POST | /v1/trips | true | Create a trip by the admin
PATCH | /V1/trips/<trip_id>/cancel | true | Cancel a particular trip by admin
POST | /v1/bookings | true | Create a booking
GET | /v1/bookings | true | Fetch bookings​ records by user and all by admin
DELETE | /v1/bookings/<booking_id> | true | Delete a specific booking by user

### Tests
```
$ npm run test
```

### Licence
MIT &COPY; [StevenDerrick](https://www.github.com/StevenDerrick)

## Author:
#### Steven Ishimwe

