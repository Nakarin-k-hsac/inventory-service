const productService = require('../services/productService');

class ProductController {
    async getProducts(req, res) {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const result = await productService.getProducts(page, limit, search);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error', error: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error', error: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await productService.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Deleted successfully', product });
        } catch (error) {
            res.status(500).json({ message: 'Error', error: error.message });
        }
    }
}

module.exports = new ProductController();