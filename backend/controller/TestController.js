const TestService = require('../service/TestService')

class TestController {
    runPythonMain = async (req, res) => {
        try {
            const result = await TestService.runPythonMain(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new TestController