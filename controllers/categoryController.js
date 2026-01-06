const categoryService = require('../services/categoryService');

class CategoryController {
    async getCategories(req, res) {
        try {
            const { page = 1, limit = 10, search = '' } = req.query;
            const result = await categoryService.getCategories(page, limit, search);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error', error: error.message });
        }
    }

    async getCategoryById(req, res) {
        try {
            const category = await categoryService.getCategoryById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: 'Error', error: error.message });
        }
    }

    async createCategory(req, res) {
        try {
            const category = await categoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error.message });
        }
    }

    async updateCategory(req, res) {
        try {
            const category = await categoryService.updateCategory(req.params.id, req.body);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(400).json({ message: 'Error', error: error.message });
        }
    }

    async deleteCategory(req, res) {
        try {
            const category = await categoryService.deleteCategory(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Deleted successfully', category });
        } catch (error) {
            res.status(500).json({ message: 'Error', error: error.message });
        }
    }

}

module.exports = new CategoryController();