const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const InvoiceService = require('../../services/invoice.service');

exports.create = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const documents = await invoiceService.create(req.body);
        res.send(documents);
    } catch (error) {
        next(new ApiError(500, 'error when create invoice'));
    }
};
