const UserService = require('../service/UserService')
const AuthService = require('../service/AuthService')

class UserController {
    getInfo = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const result = await UserService.getInfo(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    setInfo = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            var { email, CCCD, username } = req.body;
            if (email) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email.trim())) {
                    return res.status(400).json({ status: false, message: "Email không đúng định dạng" });
                }
            }
            else email = req.session.user.email;

            if (CCCD) {
                const cccdRegex = /^[0-9]{12}$/;
                if (!cccdRegex.test(CCCD.trim())) {
                    return res.status(400).json({ status: false, message: "CCCD không hợp lệ" });
                }
            }
            else CCCD = req.session.user.id;

            if (!username) username = req.session.user.name;

            const data = { email, CCCD, username }

            const result = await UserService.setInfo(data, req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    getHistory = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const result = await UserService.getHistory(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

    getNotice = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const result = await UserService.getNotice(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(404).json({status: false, error: err});
        }
    }

}

module.exports = new UserController