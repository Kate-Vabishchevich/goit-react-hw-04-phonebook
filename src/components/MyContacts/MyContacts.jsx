import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './MyContacts.module.css';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsSearch from './ContactsSearch/ContactsSearch';
import ContactsList from './ContactsList/ContactsList';

const initial = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const MyContacts = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initial;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts.`);
    }
    setContacts(prevContacts => {
      return [{ id: nanoid(), name, number }, ...prevContacts];
    });
  };

  const handleSearch = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedSearch = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(normalizedSearch);
    });
    return result;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const peoples = getFilteredContacts();
  const isContacts = Boolean(peoples.length);

  return (
    <div className={css.wrapper}>
      <div className={css.block}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactsForm onSubmit={addContact} />
      </div>
      <div className={css.block}>
        <h2 className={css.title}>Contacts</h2>
        <ContactsSearch handleChange={handleSearch} />
        {isContacts && (
          <ContactsList removeContact={removeContact} contacts={peoples} />
        )}
        {!isContacts && <p>No contacts in the list</p>}
      </div>
    </div>
  );
};

export default MyContacts;
