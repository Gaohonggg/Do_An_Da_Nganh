const db = require('../data/db');

class TestService {
    test() {
        try {
            db.execute("create table test (testt INT);");
            return {
                status: "Success"
            };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = new TestService