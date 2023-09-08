const ApiError = require('../../api-errors');
const MongoDB = require('../../utils/mongodb.util');
const InvoiceService = require('../../services/invoice.service');
const { default: add } = require('date-fns/add/index.js');

exports.create = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const documents = await invoiceService.create(req.body);
        res.send(documents);
    } catch (error) {
        next(new ApiError(500, 'error when create invoice'));
    }
};

exports.getAllInvoice = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const { state, userid } = req.query;
        const documents = await invoiceService.getAllInvoice(state, userid);
        if (documents) {
            res.send(documents);
        } else {
            console.log('co loi xay ra');
        }
    } catch (error) {
        console.log(error);
    }
};

exports.cancelOrder = async (req, res, next) => {
    try {
        const invoiceService = new InvoiceService(MongoDB.client);
        const result = await invoiceService.updateStatus(req.params.id);
        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};