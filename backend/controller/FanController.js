const FanService = require('../service/FanService')
const AuthService = require('../service/AuthService')

class FanController {
    getFan = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const result = await FanService.getFan(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    setFan = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            var uid;
            if (check.status) {
                if (req.body.uid) {
                    console.log('hehe')
                    uid = req.body.uid
                }
                else {
                    console.log('haha')
                    console.log(req.session.user)
                    return res.status(200).json(check);
                }
            }
            else uid = req.session.user.id
            var { id, level } = req.body;
            var status = "";
            if (level < 0 || level > 3) return res.status(404).json({status: false, message: "Thiếu thông tin điều khiển"});
            if (level == 0) status = "OFF";
            else if (level > 0) status = "ON";
            const result = await FanService.setFan({ id, status, level, uid }, req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new FanController