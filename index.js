const {listContacts, getContactById, addContact, removeContact} = require('./contacts')


async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const contacts = await listContacts();
			console.log(contacts)
		break;

		case "get":
			const contact = await getContactById(id);
			console.log(contact)
		break;

		case "add":
			const newContact = await addContact({name, email, phone})
			console.log(newContact);
		break;

		case "remove":
			const removedContact = await removeContact(id)
			console.log(removedContact)
		break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

const action = {
	action: 'list',
	// id: 'qMvp4_FFu5s766ANhKU5K',
    // name: "Alec Howard",
    // email: "Donec.elementum@scelerisquescelerisquedui.net",
    // phone: "(748) 206-2688"
}

invokeAction(action);
