const db = require('../config/db_config');
const Response = require('../lib/Response');
const Enum = require('../config/Enum');


module.exports = async (req, res, next) => {
    const userID = req.session.userID;
    console.log(userID);
    await db.mysqlPool.query(`SELECT * FROM users WHERE id = '${userID}'`)
        .then(([user]) => {
            if (user.length < 1) {


                return res.status(Enum.HTTP_CODES.UNAUTHORIZED).json({ success: false, result: "User not found" });
            }
            next();


        })
        .catch((error) => {
            let errorResponse = Response.errorResponse(error);
            return res.status(errorResponse.code).json(errorResponse);
        });
};
