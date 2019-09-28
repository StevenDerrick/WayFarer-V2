import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

const adminToken = process.env.ADMIN_TOKEN;
const user1Token = process.env.USER_1TOKEN;
const user2Token = process.env.USER_2TOKEN;

chai.use(chaiHttp);

describe('Testing returning no trips available', () => {
  it('should return no trip available', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});


describe('Testing admin create a trip', () => {
  it('should return Forbidden: you must login to proceed', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('should return Forbidden: Only Admins can perform this operation', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it("should validate the trip round 1", done => {
    const trip = {
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      origin: "gisenyi",
      destination: "muhabura",
      fare: 5000,
      trip_date: "2019-12-23"
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should validate the trip round 2", done => {
    const trip = {
      bus_license_number: "RAD303E",
      origin: "gisenyi",
      destination: "muhabura",
      fare: 5000,
      trip_date: "2019-12-23",
      available_seats: 30,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should validate the trip round 3", done => {
    const trip = {
      origin: "gisenyi",
      destination: "muhabura",
      trip_date: "2019-12-23",
      available_seats: 30,
      seating_capacity: 30,
      fare: 5000,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should validate the trip round 4", done => {
    const trip = {
      origin: "gisenyi",
      destination: "muhabura",
      trip_date: "2019-12-23",
      available_seats: 30,
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should validate the trip round 5", done => {
    const trip = {
      origin: "gisenyi",
      destination: "muhabura",
      available_seats: 30,
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      fare: 5000,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should validate the trip round 6", done => {
    const trip = {
      origin: "gisenyi",
      available_seats: 30,
      trip_date: "2019-12-23",
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      fare: 5000,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should validate the trip round 7", done => {
    const trip = {
      available_seats: 30,
      trip_date: "2019-12-23",
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      destination: "muhabura",
      fare: 5000,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should return create trip is successfull", done => {
    const trip = {
      available_seats: 30,
      origin: "gisenyi",
      trip_date: "2019-12-23",
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      destination: "muhabura",
      fare: 5000,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it("should validate the trip round 7", done => {
    const trip = {
      available_seats: 30,
      trip_date: "2019-12-23",
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      destination: "muhabura",
      fare: 5000,
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should return This trip already exists", done => {
    const trip = {
      available_seats: 30,
      trip_date: "2019-12-23",
      seating_capacity: 30,
      bus_licence_number: "RAD303E",
      destination: "Africa",
      fare: 5000,
      origin: 'Hanze',
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("Authorization", adminToken)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});


describe('Testing filtering Trips', () => {
  it('should return filtered trip based on origin available available', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Authorization', user1Token)
      .query({origin: 'gisenyi'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return filtered trip based on origin available available', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Authorization', user1Token)
      .query({destination: 'muhabura'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});


describe('Testing returning all trips available', () => {
  it('should return all trips available', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing returning specific trip', () => {
  it('should return no trip with this ID wich is available', (done) => {
    chai.request(app)
      .get('/api/v1/trips/29')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should return specific trip available', (done) => {
    chai.request(app)
      .get('/api/v1/trips/1')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});


describe('Testing cancel trip by admin', () => {
  it('should return no trip with this ID wich does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/19/cancel')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('should cancel a trip with the given ID', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/2/cancel')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return this trip is already cancelled', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/2/cancel')
      .set('Authorization', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it("should return this Trip is Already cancelled", done => {
    const bookingOk = {
      trip_id: '2',
    };
    chai
        .request(app)
        .post("/api/v1/booking/")
        .set("Authorization", user2Token)
        .send(bookingOk)
        .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
        });
    });
});