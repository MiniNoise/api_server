import * as agent from 'superagent';
import uuid = require('uuid/v4');

describe("/api/v1/user", () => {

    let email: string;
    let password: string;
    let session: string;

    beforeAll((done) => {
        email = `test${uuid()}@mail.com`;
        password = uuid();
        done();
    });

    it("Create a new Account", (done) => {
        agent.post('http://127.0.0.1:3001/api/v1/user')
        .send({
            email,
            password
        })
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            done();
        });
    });

    it("Should be able to login with created account", (done) => {
        agent.post(`http://127.0.0.1:3001/api/v1/user/${email}`)
        .send({
            password
        })
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            session = res.body.data.session;
            done();
        });
    });

    it("Should delete account", (done) => {
        agent.delete(`http://127.0.0.1:3001/api/v1/user/${email}`)
        .set('Authorization', session)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            done();
        });
    });

    it("Should no longer be able to login", (done) => {
        agent.post(`http://127.0.0.1:3001/api/v1/user/${email}`)
        .send({
            password
        })
        .end((err, res) => {
            expect(res.status).toBe(500);
            expect(res.body.code).toBe("02");
            done();
        });
    });

});
