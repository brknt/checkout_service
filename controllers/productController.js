const db = require('../config/db_config');
const Response = require('../lib/Response');



const getAllProducts = async(req, res, next)=>{
    try {
        const [results] = await db.mysqlPool.query(`SELECT * FROM products`);
        res.json(Response.successResponse({ success: true, result:results }, 200));
        
    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);
        
    }
}

const getProductById = async(req, res, next)=>{
    try {
        const id = req.params.id;
        console.log(id);
        const [results] = await db.mysqlPool.query(`SELECT * FROM products WHERE productID = ${id}`);
        res.json(Response.successResponse({ success: true, result:results }, 200));
        

    } catch (error) {
        let errorResponse = Response.errorResponse(error);
        res.status(errorResponse.code).json(errorResponse);
        
    }
}


module.exports = {
    getAllProducts,
    getProductById
}