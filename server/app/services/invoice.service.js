const { ObjectId } = require('mongodb');
class InvoiceService {
    constructor(client) {
        // get collection product
        this.Invoice = client.db().collection('invoices');
        this.Product = client.db().collection('products');
        this.User = client.db().collection('users');
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
            UserId: new ObjectId(payload.UserId),
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

    async getAllInvoice(state, userid) {
        const status = parseInt(state);
        try {
            let filter = {};
            if (state && userid) {
                filter = {
                    UserId: new ObjectId(userid),
                    StatusId: status,
                };
            }
            if (userid && !state) {
                filter = {
                    UserId: new ObjectId(userid), // to get all state
                };
            }
            if (!userid && !state) {
                filter = {};
            }
            // get Invoice with status of one user
            const InvoiceProduct = await this.Invoice.find(filter).toArray();
            //to get each product
            //to get each order
            let documents = [];
            /* 
            [
                {
                    //1 order
                    _id:
                    user:{}
                    status:
                    detail:[
                        {},{}
                    ]
                }
            ]
            */
            // to get product and amount
            const Detail = async (items, items_remain) => {
                let order = {}; //refesh 1 order to add another order

                let OrderDetail = []; // to get all detail of 1 order
                order._id = new ObjectId(items_remain.Invoiceid);
                order.status = items_remain.status;
                for (const item of items) {
                    let product = await this.Product.findOne({ _id: new ObjectId(item._id) });
                    if (product) {
                        product.ordernumber = item.amount;
                        product.oldprice = item.price ?? ''; //get recent price
                        OrderDetail.push(product); // Collect the result in the documents array.
                    }
                }
                order.detail = OrderDetail;

                let { email, phone } = await this.User.findOne({ _id: items_remain.UserId });
                let user = {
                    email: email,
                    phone: phone,
                };
                order.user = user;
                order.orderdate = items_remain.CreateDate;
                order.deliverydate = items_remain.DeliveryDate;
                documents.push(order);
            };

            // loop every Detail
            for (const items of InvoiceProduct) {
                await Detail(items.Detail, items);
            }
            return documents; // This will print the collected documents after all processing is done.
        } catch (error) {
            console.log(error);
        }
    }
    async updateStatus(id) {
        try {
            const result = await this.Invoice.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { StatusId: 4 } });
            if (result) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = InvoiceService;
