import React, { useEffect, useState } from 'react';
import API from '../api';
import ContactForm from './ContactForm';

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await API.get('/contacts');
    setContacts(res.data);
  };

  const deleteContact = async (id) => {
    await API.delete(`/contacts/${id}`);
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ContactForm onRefresh={fetchContacts} />
      {contacts.map((c) => (
        <div key={c._id}>
          {c.name} - {c.email} - {c.phone}
          <button onClick={() => deleteContact(c._id)}>Delete</button>
          

        </div>
      ))}
    </div>
  );
}
