const db = require('../../database');

class CategoriesRepository {
    async findAll() {
        const [row] = await db.query(`SELECT * FROM categories`);
    }
    async create({ name }) {
        const [row] = await db.query(`
            INSERT INTO categories(name)
            VALUES ($1)
            RETURNING *
        `, [name]);
    }
}

module.exports = new CategoriesRepository();