const TestService = require('../service/TestService')

class TestController {
    test = async (req, res) => {
        try {
            const result = await TestService.test();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new TestController