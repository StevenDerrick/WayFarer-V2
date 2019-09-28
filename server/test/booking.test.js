import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

const adminToken = process.env.ADMIN_TOKEN;
const user1Token = process.env.USER_1TOKEN;
const user2Token = process.env.USER_2TOKEN;

chai.use(chaiHttp);

describe('Testing Booking a Trip', () => {
    it("should validate the booking", done => {
    const booking = {
        trip_id: '',
    };

    chai
        .request(app)
        .post("/api/v1/booking/")
        .set("Authorization", user1Token)
        .send(booking)
        .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
        });
    });
    it("should validate the booking", done => {
    const booking = {
        trip_id: '7',
    };

    chai
        .request(app)
        .post("/api/v1/booking/")
        .set("Authorization", user1Token)
        .send(booking)
        .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
        });
    });
    it("should book a trip by user", done => {
    const booking = {
        trip_id: '1',
    };

    chai
        .request(app)
        .post("/api/v1/booking/")
        .set("Authorization", user1Token)
        .send(booking)
        .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('data');
        done();
        });
    });
    it("should book a trip by Admin", done => {
    const booking = {
        trip_id: '3',
    };

    chai
        .request(app)
        .post("/api/v1/booking/")
        .set("Authorization", adminToken)
        .send(booking)
        .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('data');
        done();
        });
    });
});


describe('Testing viewing bookings', () => {
    it('should return You do not have bookings', (done) => {
      chai.request(app)
        .get('/api/v1/booking')
        .set('Authorization', user2Token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('should return all bookings by the user', (done) => {
        chai.request(app)
          .get('/api/v1/booking')
          .set('Authorization', user1Token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            done();
          });
      });
      it('should return All bookings by the admin', (done) => {
        chai.request(app)
          .get('/api/v1/booking')
          .set('Authorization', adminToken)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            done();
          });
      });
  });


  describe('Testing Deleting bookings', () => {
  it('should return You do not have bookings', (done) => {
    chai.request(app)
      .delete('/api/v1/booking/2')
      .set('Authorization', user2Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return You do not have bookings with this ID', (done) => {
    chai.request(app)
      .delete('/api/v1/booking/2')
      .set('Authorization', user1Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return booking deleted successfully', (done) => {
  chai.request(app)
      .delete('/api/v1/booking/2')
      .set('Authorization', adminToken)
      .end((err, res) => {
      expect(res).to.have.status(200);
      done();
      });
  });  
  });