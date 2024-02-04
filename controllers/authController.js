const bcrypt = require('bcrypt');
const db = require('../config/db_config');
const Response = require('../lib/Response');
const Enum = require('../config/Enum');


const createUser = async(req,res)=>{
    try {
        const data = req.body;

        if (data.name != '' && data.password != '') {
            const password_hash = await bcrypt.hash(data.password, 10);
            var [results] = await db.mysqlPool.query(`INSERT INTO checkout_serviceDB.users
            (
            name,
            email,
            password)
            VALUES
            ("${data.name}","${data.email}","${password_hash}");`
            );
        }
        res.json(Response.successResponse({ success: true, result: results }, 201));
        
    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);

        const [user] = await db.mysqlPool.query(`
        SELECT * FROM users WHERE email='${email}';`);
        console.log(user);

        if (user) {


            bcrypt.compare(password, user[0].password, (err, same) => {
                if (same) {

                    req.session.userID = user[0].id;
                    res.json(Response.successResponse({ success: true }, 200));

                } else {
                    res.status(Enum.HTTP_CODES.UNAUTHORIZED).json({success:false,result:"Your password is not correct!"});
                    
                }

            });
        } else {
            res.status(Enum.HTTP_CODES.UNAUTHORIZED).json({success:false,result:"User is not exists!"});
                    

        }


    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);

    }

}

const logoutUser = (req, res) => {
    console.log('logout');

    req.session.destroy(() => {
        res.json(Response.successResponse({ success: true }, 200));
    });
}


module.exports = {
    createUser,
    loginUser,
    logoutUser
}