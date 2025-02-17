const jwt = require('jsonwebtoken');

module.exports = {
    validAcess: (req, res, next) => {
        let token = req.cookies.token; // busca token no cookie
        
        if (!token) {
            return res.status(403).json({ message: "Token is missing" });
        }

        console.log(token); // Para depuração, veja se o token é capturado corretamente
        jwt.verify(token, '53nh@', (err, obj) => {
            if (err) return res.status(403).json({ message: "Invalid token" });

            req.user = obj.user;
            next();
        });
    }
};

