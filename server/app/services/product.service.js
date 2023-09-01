const { ObjectId } = require('mongodb');
class ProductService {
    constructor(client) {
        // get collection product
        this.Product = client.db().collection('products');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload, img) {
        if (img == null) {
            img = payload.img;
        }
        const product = {
            name: payload.name,
            price: payload.price,
            number: payload.number,
            discount: payload.discount,
            describe: payload.describe,
            img: img,
            brand: payload.brand,
            state: payload.state,
        };
        // Remove undefined fields
        Object.keys(product).forEach((key) => product[key] === undefined && delete product[key]);
        return product;
    }
    // create and save product
    async create(payload, img) {
        const product = this.extractProductData(payload, img);
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: {} },
            { returnDocument: 'after', upsert: true },
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        // console.log(await cursor.toArray());
        return await cursor.toArray();
    }
    // find product by name
    async findByName(name) {
        return await this.find({
            //so sanh voi name trogn mongodb // khop chu khoa thuong : i
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
    // find product by id
    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //update product
    async update(id, payload, img) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        // if (img) {
        const update = this.extractProductData(payload, img);
        // }
        const result = await this.Product.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete product
    async deleteProduct(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // find favorite
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    // delete all product
    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
    async findImgByName(imgName) {
        return await this.Product.findOne({ img: imgName });
    }
}

module.exports = ProductService;
