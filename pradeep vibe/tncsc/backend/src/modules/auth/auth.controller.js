const authService = require('./auth.service');

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email and password are required' });
            }

            const result = await authService.login(email, password);
            if (!result) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            res.json({ success: true, data: result });
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUser(req, res, next) {
        // Placeholder for when we have middleware
        res.json({ message: 'User details' });
    }
}

module.exports = new AuthController();
