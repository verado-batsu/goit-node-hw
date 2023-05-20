const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
	try {
		const buffer = await fs.readFile(contactsPath)
		const contacts = JSON.parse(buffer);
		return contacts;
	} catch (error) {
		console.log(error)
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find(({ id }) => {
			return id === contactId
		})
		return contact || null;
	} catch (error) {
		console.log(error)
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const contactIndex = contacts.findIndex(contact => contact.id === contactId)
		if (contactIndex === -1) {
			return null;
		}
		const [result] = contacts.splice(contactIndex, 1);

		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));

		return result;
	} catch (error) {
		console.log(error)
	}
	
}

async function addContact(data) {
	try {
		const contacts = await listContacts();
		const newContact = {
			id: nanoid(),
			...data
		}
		contacts.push(newContact)
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
		return newContact;
	} catch (error) {
		console.log(error);
	}
	
}

module.exports = {
	listContacts, 
	getContactById, 
	removeContact, 
	addContact
}