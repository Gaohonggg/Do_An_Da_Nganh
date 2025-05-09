const AuthService = require('../service/AuthService')

class AuthController {
    check = async (req, res) => {
        try {
            const result = await AuthService.check(req);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json({ status: false, error: err });
        }
    }

    getId = async (req, res) => {
        try {
            const result = await AuthService.getId(req);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json({ status: false, error: err });
        }
    }

    createUser = async (req, res) => {
        try {
            const result = await AuthService.createUser(req.body);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json({ status: false, error: err });
        }
    }

    logout = async (req, res) => {
        try {
            const result = await AuthService.logout(req);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json(err);
        };
    }

    login = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (!check.status) return res.status(200).json(check);
            const userinfo = await AuthService.login(req.body, req);
            return res.status(200).send(userinfo);
        } catch (err) {
            return res.status(200).json({ status: false, error: err });
        };
    }

    forgotPassword = async (req, res) => {
        try {
            const result = await AuthService.forgotPassword(req.body);
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(200).json({ status: false, error: err });
        }
    }

    changePassword = async (req, res) => {
        try {
            const check = await AuthService.check(req);
            if (check.status) return res.status(200).json(check);
            const newUser = await AuthService.changePassword(req.body, req);
            return res.status(200).send(newUser);
        }
        catch (err) {
            return res.status(200).json({ status: false, message: err });
        }
    }

}

module.exports = new AuthController