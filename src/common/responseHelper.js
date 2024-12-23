
//  * Utility function to create consistent API responses
//  * @param {Object} res - Express response object
//  * @param {number} status - HTTP status code
//  * @param {boolean} success - Indicates success or failure
//  * @param {string} message - Descriptive message
//  * @param {Object} [data=null] - Additional data to include in the response (optional)
const responseMsg = (res, status, success, message, data = null) => {
const response = {
    success,
    message
};
if (data) {
    response.data = data;
}
return res.status(status).json(response);
};
module.exports = { responseMsg };