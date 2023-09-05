const { ObjectId } = require('mongodb');
class InvoiceService {
    constructor(client) {
        // get collection product
        this.Invoice = client.db().collection('invoices');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload) {
        const { format, addDays } = require('date-fns');

        // Get the current date and format it as 'YYYY-MM-DD'
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'yyyy-MM-dd');

        // Calculate the delivery date (5 days from the current date)
        const deliveryDate = addDays(currentDate, 5);
        const formattedDeliveryDate = format(deliveryDate, 'yyyy-MM-dd');

        const invoice = {
            PaymentMethod: payload.PaymentMethod,
            UserId: payload.UserId,
            CreateDate: formattedDate,
            DeliveryDate: formattedDeliveryDate,
            StatusId: 0,
            Detail: payload.Detail,
        };
        // Remove undefined fields
        Object.keys(invoice).forEach((key) => invoice[key] === undefined && delete invoice[key]);
        return invoice;
    }
    // create and save invoice
    async create(payload) {
        const invoice = this.extractProductData(payload);
        const result = await this.Invoice.insertOne(invoice);
        return result;
    }
}
module.exports = InvoiceService;
