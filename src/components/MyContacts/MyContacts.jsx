import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import css from './MyContacts.module.css';
import ContactsForm from "./ContactsForm/ContactsForm";
import ContactsSearch from "./ContactsSearch/ContactsSearch";
import ContactsList from "./ContactsList/ContactsList";

const MyContacts = () => {
    const [contacts, setContacts] = useState(() => {
        return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts]);

    const addContact = ({ name, number }) => {
        if (isDublicate(name)) {
            alert(`${name} is already in contacts.`);
            return;
        }

        setContacts(prevContacts => {
            const newContact = {
                id: nanoid(),
                name,
                number,
            };
            return [newContact, ...prevContacts] ;
        });
        return;
    };

    const isDublicate = (name)=> {
        const normalizedName = name.toLowerCase();
        const result = contacts.find(({name}) => {
            return name.toLocaleLowerCase() === normalizedName;
        });
        return Boolean(result);
    };

    const handleSearch = e => setFilter(e.target.value);

    const getFilteredContacts = () => {
        if  (!filter ) {
            return contacts;
        }

        const normalizedSearch = filter.toLowerCase();
        const result = contacts.filter(({ name }) => {
            return name.toLocaleLowerCase().includes(normalizedSearch)
        });
        return result;
    };

    const removeContact = id => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id)
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
                    {isContacts && (<ContactsList removeContact={removeContact} contacts={peoples} />)}
                    {!isContacts && <p>No contacts in the list</p>}
                    
                </div>
            </div>
        );
    
};

export default MyContacts;