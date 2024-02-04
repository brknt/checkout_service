const bcrypt = require('bcrypt');
const db = require('../config/db_config');
const Response = require('../lib/Response');
const Enum = require('../config/Enum');


const createUser = async (req, res) => {
    try {
        const data = req.body;
        const [userData] = await db.mysqlPool.query(`SELECT * FROM users WHERE email='${data.email}'`);


        if (userData.length < 1) {
            if (data.email != '' && data.password != '') {
                const password_hash = await bcrypt.hash(data.password, 10);
                var [results] = await db.mysqlPool.query(`INSERT INTO users
            (
            name,
            email,
            password)
            VALUES
            ("${data.name}","${data.email}","${password_hash}");`
                );
            }
        } else {
            return res.status(Enum.HTTP_CODES.UNAUTHORIZED).json({ results: "Such a user already exists!" });
        }
        return res.json(Response.successResponse({ success: true, result: results }, 201));

    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [user] = await db.mysqlPool.query(`
        SELECT * FROM users WHERE email='${email}';`);
       

        if (user.length>0) {
            bcrypt.compare(password, user[0].password, (err, same) => {
                if (same) {

                    req.session.userID = user[0].id;
                    return res.json(Response.successResponse({ success: true }, 200));

                } else {
                    return res.status(Enum.HTTP_CODES.UNAUTHORIZED).json({ success: false, result: "Your password is not correct!" });

                }

            });
        } else {
            return res.status(Enum.HTTP_CODES.UNAUTHORIZED).json({ success: false, result: "User is not exists!" });


        }


    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        return res.status(errorResponse.code).json(errorResponse);

    }

}

const logoutUser = (req, res) => {
    console.log('logout');

    req.session.destroy(() => {
        return res.json(Response.successResponse({ success: true }, 200));
    });
}


module.exports = {
    createUser,
    loginUser,
    logoutUser
}