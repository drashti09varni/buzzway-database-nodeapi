require('dotenv').config();
const jwt = require("jsonwebtoken");
const Users = require("../Model/UserData.modal");

const authCheck = async (req, res, next) => {
    let token = req.headers.authorization;

    // let token = req.cookies.token || req.headers.authorization;
    // if(token?.startsWith('token')) token = token.split('=')[1];

    try {
        if(!token) throw new Error("Not Authorised!");

        const verify = await jwt.verify(token, process.env.JWT_SECRET);
        const username = verify._id;

        if(!username) throw new Error("No id found!");

        const user = await Users.findOne({username});
        if(!user) throw new Error('No user found. Please check username and Passwords');

        req.user = user;
        next();
    } catch (err) {
        let message;
        if(err.name == "TokenExpiredError") message = "Login Session Expired. Please Login Again.";
        if(err.name == "JsonWebTokenError") message = "Error in Login. Please Login Again.";

        res.json({
            status: 'fail',
            error: true, 
            message: message || err.message || "Unknown error occur.",
            data: null
        });
    }
}

module.exports = {authCheck};