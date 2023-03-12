const ContactsRepository = require('../repositories/ContactsRepositories');

class ContactController {
    async index(request, response) { // show all
        const { orderBy } = request.query;
        const contacts = await ContactsRepository.findAll(orderBy);
        response.json(contacts);
    }
    async show(request, response) { // show one
        const { id } = request.params;
        const contact = await ContactsRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: 'User not found' })
        }

        response.json(contact);
    }
    async store(request, response) { // create
        const { name, email, phone, category_id } = request.body;

        const contactExists = await ContactsRepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({ error: 'This e-mail is already been taken' });
        }

        const contact = await ContactsRepository.create({ name, email, phone, category_id });

        response.json(contact);
    }
    async delete(request, response) { // delete
        const { id } = request.params;

        const contact = await ContactsRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: 'User not found' })
        }

        await ContactsRepository.delete(id);

        response.json();
    }
    async update(request, response) { // update
        const { id, name, email, phone, category_id } = request.body;

        const contactExists = await ContactsRepository.findById(id);

        if (contactExists) {
            return response.status(404).json({ error: 'User not found' });
        }

        const contact = await ContactsRepository.update({
            id, name, email, phone, category_id 
        });
        
        response.json(contact);
    }
}

module.exports = new ContactController(); // singleton 