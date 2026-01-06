const Product = require('../models/Product');

class ProductService {

    async getProducts(page = 1, limit = 10, search = '') {
        const query = {};

        if (search && search.trim()) {
            query.name = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find(query)
                .populate('categoryId')
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 }),

            Product.countDocuments(query)
        ]);

        return {
            products,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        };
    }

    async getProductById(id) {
        return Product.findById(id).populate('category');
    }

    async createProduct(data) {
        return Product.create(data);
    }

    async updateProduct(id, data) {
        return Product.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteProduct(id) {
        return Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductService();