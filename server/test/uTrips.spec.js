import app from "../../server";
import dotenv from 'dotenv';
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import { doesNotReject } from "assert";
import { users } from "../models/users";
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

dotenv.config();

describe("user can view trips", () => {
  it("logged in user can view trips available", done => {
    const user = {
      first_name: "Steven",
      last_name: "ISHIMWE",
      email: "kidiya@gmail.com",
      password: "yego123",
      
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImlpenplZGRpbjYyQGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTY4ODEzNTIwfQ.hMRR4PLRPRszowX_MgsoI55-V9jKmVgMP3gL9Yvjglg"

    chai
      .request(app)
      .get("/api/v1/trips")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("unlogged user can not access resources", () => {
    chai
      .request(app)
      .get("/api/v1/trips")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
      });
  });
});
describe("user can view an individual trip", () => {
  it("logged in user can view trips available", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImlpenplZGRpbjYyQGdtYWlsLmNvbSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1NjUzNDMxNTV9.tKjW5uMIG61nGhufJ5Rg3LQc6gKIZsv1vs-VbNh5wDs"

    chai
      .request(app)
      .get("/api/v1/trips/1")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("logged in user can view trips available", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImlpenplZGRpbjYyQGdtYWlsLmNvbSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1NjUzNDMxNTV9.tKjW5uMIG61nGhufJ5Rg3LQc6gKIZsv1vs-VbNh5wDs"

    chai
      .request(app)
      .get("/api/v1/trips/145")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it("unlogged user can not access resources", () => {
    chai
      .request(app)
      .get("/api/v1/trips/1")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
      });
  });
});
describe("admin can create trips", () => {
  it("logged in admin  can create trips", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true,
      trip_date: "2019-12-23"
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImlpenplZGRpbjYyQGdtYWlsLmNvbSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE1NjUzNDMxNTV9.tKjW5uMIG61nGhufJ5Rg3LQc6gKIZsv1vs-VbNh5wDs"
    const trip = {
      seating_capacity: 30,
      bus_license_number: "rac 123",
      origin: "gisenyi",
      destination: "muhabura",
      fare: 123,
      trip_date: "2019-12-23"
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("token", token)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it("logged in admin  can create trips", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );
    const trip = {
      bus_license_number: "rac 123",
      origin: "gisenyi",
      destination: "muhabura",
      fare: 123,
      date: "2019-12-23"
    };

    chai
      .request(app)
      .post("/api/v1/trips/")
      .set("token", token)
      .send(trip)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});

describe("admin can cancel a trip", () => {
  it("logged in admin  can cancel a trips", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it("logged in admin  can't cancel  a trip if he doesn't give the necessary info ", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("logged in admin  can't cancel already cancelled  trip", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("admin can't cancel or create with a wrong token", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .patch("/api/v1/trips/1/cancel")
      .set("token", `${token} ndenjwenwjbfjaw`)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("logged in admin  can't cancel already cancelled  trip", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .patch("/api/v1/trips/2/cancel")
      .set("token", token)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it("admin can't cancel or create with a wrong token", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = jwt.sign(
      { user_id: users.length + 1, email: user.email, is_admin: user.is_admin },
      "izzeddin"
    );

    chai
      .request(app)
      .patch("/api/v1/trips/20/cancel")
      .set("token", `${token} ndenjwenwjbfjaw`)
      .send({ status: "cancelled" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it("should return access denied when the user is not an admin", done => {
    const user = {
      first_name: "izzedddin",
      last_name: "ishidmwe",
      email: "ishimwesesdrg@gmail.com",
      password: "izzseddin",
      is_admin: true
    };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hY2liaXJpQGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTY4ODE0OTE1fQ.qpDUq0ey_7DhBiyiIil-FxmtGGBIs-rfADfDSd-rHrg'

    chai
      .request(app)
      .post("/api/v1/trips")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });
  it("should return all trips available", done => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImtpZGl5YUBnbWFpbC5jb20iLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU2ODgxMjcyMn0.cr0DSayI6gfXbh9BFGS6lI7d_RvDXvFGUGRmeaUDodM'

    chai
      .request(app)
      .post("/api/v1/trips")
      .set("token", token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });
});
it("should return trip not fund", done => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImlzaGltd2VzdGV2ZW4xQGdtYWlsLmNvbSIsImlzX2FkbWluIjpmYWxzZSwiaWF0IjoxNTY4ODIyODQ2LCJleHAiOjE1Njk0Mjc2NDZ9._fO494C4r9fy_dKCGM2XeCsgByOeiOgIFr5PNPO6bdI'

  chai
    .request(app)
    .post("/api/v1/trips/7/cancel")
    .set("token", token)
    .end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
});
