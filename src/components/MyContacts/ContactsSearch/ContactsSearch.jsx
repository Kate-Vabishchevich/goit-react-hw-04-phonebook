import css from './ContactsSearch.module.css';
import PropTypes from 'prop-types';

const ContactsSearch = ({ handleChange }) => {
    return (
        <div className={css.group}>
            <label>Find contacts by name:</label>
                <input
                    className={css.input}
                    type="text"
                    name="filter"
                    onChange={handleChange}
                    placeholder="Enter name"
                />
            
        </div>
    );
};

export default ContactsSearch;

ContactsSearch.propTypes = {
    handleChange: PropTypes.func.isRequired,
}