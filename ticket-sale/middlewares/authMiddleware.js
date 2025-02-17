const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, '53nh@');
        req.user = decoded.user;
        next();
    } 
    catch (error) {
        return res.redirect("/login");
    }
}

module.exports = authenticate;
