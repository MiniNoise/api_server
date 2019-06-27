import * as agent from 'superagent';
import uuid = require('uuid/v4');

describe("/api/v1/user", () => {

    let email: string;
    let password: string;
    let session: string;

    const minitel1 = {
        name: "Minitel1",
        uid: uuid()
    };
    beforeAll((done) => {
        email = `test${uuid()}@mail.com`;
        password = uuid();
        agent.post('http://127.0.0.1:3001/api/v1/user')
        .send({
            email,
            password
        })
        .end((err, res) => {
            if (err) throw err;
            session = res.body.data.session;
            minitel1['email'] = email;
            done();
        });
    });

    it("Should Add a new minitel to user", (done) => {
        agent.post('http://127.0.0.1:3001/api/v1/minitel')
        .set('Authorization', session)
        .send(minitel1)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            done();
        });
    });

    it("Should recover user's minitel", (done) => {
        agent.get(`http://127.0.0.1:3001/api/v1/minitel/${email}`)
        .set('Authorization', session)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            expect(res.body.data[0].uid.trim()).toBe(minitel1.uid);
            done();
        });
    });

    it("Should remove minitel", (done) => {
        agent.delete(`http://127.0.0.1:3001/api/v1/minitel/${minitel1.uid}`)
        .set('Authorization', session)
        .send({email})
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            done();
        });
    });

    it("Should recover no minitel", (done) => {
        agent.get(`http://127.0.0.1:3001/api/v1/minitel/${email}`)
        .set('Authorization', session)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            expect(res.body.data.length).toBe(0);
            done();
        });
    });

    afterAll((done) => {
        agent.delete(`http://127.0.0.1:3001/api/v1/user/${email}`)
        .set('Authorization', session)
        .end((err, res) => {
            if (err) throw err;
            expect(res.body.code).toBe("00");
            done();
        });
    });
});
