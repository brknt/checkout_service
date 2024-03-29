const Enum = require('../config/Enum');
const CustomError = require('../lib/CustomError');

class Response {

    constructor() { }

    // Success Response:
    static successResponse(data, code) {
        return {
            code: code || 200,
            data
        };

    }


    // Error Response:
    static errorResponse(error) {

        if (error instanceof CustomError) {
            return {
                code: error.code,
                error: {
                    message: error.message,
                    description: error.description
                }
            }
        }

        else if (error.message.includes("E11000")) {
            return {
                code: Enum.HTTP_CODES.CONFLICT,
                error: {
                    message: "Already Exist!",
                    description: "Already Exist!"
                }
            }
        }


        return {
            code: Enum.HTTP_CODES.INT_SERVER_ERROR,
            error: {
                message: "Unknown Error",
                description: error.message
            }
        }


    }

}




module.exports = Response;