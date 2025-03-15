const LightService = require('../service/LightService')
const AuthService = require('../service/AuthService')

class LightController {
    getLight = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const result = await LightService.getLight(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    setLight = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            var { id, status, brightness } = req.body;
            if (brightness == null) brightness = -1;
            if (status == null) status = "";
            if (status == "ON") brightness = 100;
            else if (status == "OFF") brightness = 0;
            if (brightness == 0) status = "OFF";
            else if (brightness > 0) status = "ON";
            const result = await LightService.setLight({ id, status, brightness }, req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new LightController