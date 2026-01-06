const Category = require('../models/Category');

class CategoryService {

    async getCategories(page = 1, limit = 10, search = '') {
        const query = { isDeleted: false };

        if (search && search.trim()) {
            query.name = { $regex: search, $options: 'i' };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const [categories, total] = await Promise.all([
            Category.find(query)
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 }),

            Category.countDocuments(query)
        ]);

        return {
            categories,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        };
    }

    async getCategoryById(id) {
        return Category.findOne({
            _id: id,
            isDeleted: false
        });
    }

    async createCategory(categoryData) {
        return Category.create(categoryData);
    }

    async updateCategory(id, categoryData) {
        return Category.findOneAndUpdate(
            { _id: id, isDeleted: false },
            categoryData,
            { new: true, runValidators: true }
        );
    }

    async deleteCategory(id) {
        return Category.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
    }

    async getAllCategories() {
        return Category
            .find({ isDeleted: false })
            .select('_id name')
            .sort({ name: 1 });
    }
}

module.exports = new CategoryService();