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
            var { id, status } = req.body;
            if (status == null) res.status(404).json({status: false, message: "Thiếu thông tin điều khiển"});
            const result = await LightService.setLight({ id, status }, req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new LightController