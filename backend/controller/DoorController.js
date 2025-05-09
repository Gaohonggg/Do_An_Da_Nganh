const DoorService = require('../service/DoorService')
const AuthService = require('../service/AuthService')

class DoorController {
    getDoor = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const result = await DoorService.getDoor(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    setDoor = async (req, res) => {
        try {
            var { id, status, door_id } = req.body;
            if (status == null || (status != "ON" && status != "OFF")) return res.status(404).json({status: false, message: "Thiếu thông tin điều khiển"});
            const result = await DoorService.setDoor(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    getFace = async (req, res) => {
        try {
            const result = await DoorService.getFace();
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    setFace = async (req, res) => {
        try {
            const result = await DoorService.setFace(req.body);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }
}

module.exports = new DoorController