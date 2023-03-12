const db = require('../../database') // se for index o mesmo já entende



class ContactsRepository {
    async findAll(orderBy = 'ASC') {
        orderBy = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        const [rows] = await db.query(`
            SELECT contacts.*, categories AS categories_name
            FROM contacts
            LEFT JOIN categories on categories.id = category_id
            ORDER BY contacts.name ${orderBy};
        `);
        return rows;
    }
    async findById(id) {
        const [row] = await db.query(`
            SELECT * FROM contacts
            WHERE id = $id;
        `, [id])
        return row;
    }
    async findByEmail(email) {
        const [row] = await db.query(`
            SELECT * FROM contacts
            WHERE email = $email;
        `, [email])
        return row;
    }
    async create({
        name, email, phone, category_id
    }) {
        const [row] = await db.query(`
            INSERT INTO contacts(name, email, phone, category_id)
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [name, email, phone, category_id]);
        return row;
    }
    async update({
        name, email, phone, category_id, id
    }) {
        const [row] = await db.query(`
            UPDATE contacts
            SET name = $1,
            email = $2,
            phone = $3,
            category_id = $4
            WHERE id = $5
            RETURNING *
        `, [name, email, phone, category_id, id]);
        return row;
    }
    async delete(id) {
        const deleteOp = await db.query(`
            DELETE contacts
            WHERE id = $1
        `, [id]);
        return deleteOp;
    }
}

module.exports = new ContactsRepository();
