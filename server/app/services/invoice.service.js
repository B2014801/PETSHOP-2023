const { el } = require('date-fns/locale');
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
        const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm');

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
            Vouchers: payload.Vouchers,
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
        let status = parseInt(state);
        try {
            const filter = {};
            if (state && userid) {
                filter.UserId = new ObjectId(userid);
                if (status == 1 || status == 0) {
                    filter.StatusId = { $in: [0, 1] };
                } else {
                    filter.StatusId = status;
                }
            } else if (userid && !state) {
                filter.UserId = new ObjectId(userid);
            }
            // get Invoice with status of one user
            const InvoiceProduct = await this.Invoice.find(filter).sort({ CreateDate: -1 }).toArray();
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
                order._id = new ObjectId(items_remain._id);
                order.status = items_remain.status;
                for (const item of items) {
                    let product = {};
                    product = await this.Product.findOne({ _id: new ObjectId(item._id) });
                    if (!product) {
                        product = {};
                        product.isexist = false;
                        product.name = item.name;
                        product.img = process.env.SERVER_LINK_PRODUCT_IMG + 'default_notexist_product.png';
                    } else {
                        product.isexist = true;
                    }
                    product.ordernumber = item.amount;
                    product.oldprice = item.price ?? ''; //get recent price
                    OrderDetail.push(product); // Collect the result in the documents array.
                }
                order.detail = OrderDetail;

                let user = await this.User.findOne({ _id: items_remain.UserId });
                if (!user) {
                    user = {};
                } else {
                    user = {
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                    };
                }

                order.status = items_remain.StatusId;
                order.user = user;
                order.orderdate = items_remain.CreateDate;
                order.deliverydate = items_remain.DeliveryDate;
                order.vouchers = items_remain.Vouchers;
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
    async updateStatus(data) {
        try {
            let StatusChangeTo = null;
            if (data.status == 0) {
                StatusChangeTo = 1;
            }
            if (data.status == 1) {
                StatusChangeTo = 2;
            }
            if (data.status == null) {
                StatusChangeTo = 4;
            }
            if (StatusChangeTo != null) {
                const result = await this.Invoice.findOneAndUpdate(
                    { _id: new ObjectId(data.id) },
                    { $set: { StatusId: StatusChangeTo } },
                );
                if (result) {
                    return true;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getRevenueWith() {
        try {
            const result = await this.Invoice.aggregate([
                {
                    $unwind: '$Detail', // Flatten the "detail" array
                },
                {
                    $project: {
                        year: { $year: { $dateFromString: { dateString: '$CreateDate' } } },
                        month: { $month: { $dateFromString: { dateString: '$CreateDate' } } },
                        price: {
                            $convert: {
                                input: {
                                    $reduce: {
                                        input: { $split: ['$Detail.price', '.'] },
                                        initialValue: '',
                                        in: { $concat: ['$$value', '$$this'] },
                                    },
                                },
                                to: 'double',
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: { year: '$year', month: '$month' },
                        totalRevenue: { $sum: '$price' },
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { '_id.year': 1, '_id.month': 1 },
                },
            ]).toArray();
            if (result) {
                return result;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = InvoiceService;
