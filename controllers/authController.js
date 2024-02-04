const bcrypt = require('bcrypt');
const db = require('../config/db_config');
const Response = require('../lib/Response');


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



module.exports = {
    createUser
}