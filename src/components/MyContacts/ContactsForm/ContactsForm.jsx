import { useState } from "react";
import css from './ContactsForm.module.css';
import PropTypes from 'prop-types';

const ContactsForm = ({onFormSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onFormSubmit({ name, number });
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    const handleChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    }

        return (
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.group}>
                    <label className={css.label}>Name </label>
                    <input
                        className={css.input}
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
               
                <label className={css.label}> Number</label>
                    <input
                        className={css.input}
                        type="tel"
                        name="number"
                        value={number}
                        onChange={handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                
                <button className={css.btn} type="submit">
                    Add contact
                    </button>
                </div>
            </form>
        );
    
};

export default ContactsForm;

ContactsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};