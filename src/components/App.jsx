import React from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import { addFilter } from 'redux/filter/sliceFilter';
import { add, remove } from 'redux/contacts/sliceContacts';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const formSubmitHandler = data => {
    const matchNameInput = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (matchNameInput) {
      alert(data.name + ' is already in contacts.');
    } else {
      dispatch(add(data));
    }
  };

  const handleDataUpdate = input => {
    dispatch(addFilter(input.currentTarget.value));
  };

const filteredContacts = useMemo(() => {
  if (filter !== '') {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  } else {
    return contacts;
  }
}, [contacts, filter])

  const onDeleteBtn = id => {
    dispatch(remove(id));
  };

  return (
    <>
      <Form clickSubmit={formSubmitHandler} />

      <Filter onDataUpdate={handleDataUpdate} />

      <ContactsList arrContacts={filteredContacts} onDeleteBtn={onDeleteBtn} />
    </>
  );
};

export default App;
