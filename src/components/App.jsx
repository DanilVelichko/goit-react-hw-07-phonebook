import React from 'react';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import { addFilter } from 'redux/filter/sliceFilter';
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts, deleteContact, fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading, selectContacts, selectFilter } from 'redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const formSubmitHandler = data => {
    const matchNameInput = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (matchNameInput) {
      alert(data.name + ' is already in contacts.');
    } else {
      dispatch(addContacts(data));
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
  }, [contacts, filter]);

  const onDeleteBtn = id => {
    dispatch(deleteContact(id));
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Form clickSubmit={formSubmitHandler} />

      <Filter onDataUpdate={handleDataUpdate} />
      
      <ContactsList arrContacts={filteredContacts} onDeleteBtn={onDeleteBtn} />

      {isLoading && !error && <h4 >Request in progress...</h4>}
    </>
  );
};

export default App;
