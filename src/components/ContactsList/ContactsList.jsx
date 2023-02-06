import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import ContactsItem from 'components/ContactsItem/ContactsItem';

const ContactsList = ({ arrContacts, onDeleteBtn }) => {
  return (
    <ul className={css.contacts_list}>
      {arrContacts.map(contact => {
        return (
          <ContactsItem
            id={contact.id}
            key={contact.id}
            name={contact.name}
            number={contact.number}
            onDeleteBtn={onDeleteBtn}
          />
        );
      })}
    </ul>
  );
};

ContactsList.propTypes = {
  arrContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactsList;
