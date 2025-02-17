const jwt = require('jsonwebtoken');

module.exports = {
    validAcess: (req, res, next) => {
        let token = req.cookies.token; // busca o token no cookie
        
        if (!token) {
            return res.status(403).json({ message: "Token is missing" });
        }

        //console.log(token);
        jwt.verify(token, '53nh@', (err, obj) => {
            if (err) return res.status(403).json({ message: "Invalid token" });

            //req.user = obj.user;
            req.user = obj;
            next();
        });
    }
};

