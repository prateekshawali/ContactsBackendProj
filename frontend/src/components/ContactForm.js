import React, { useState } from 'react';
import API from '../api';

export default function ContactForm({ onRefresh }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/contacts', form);
    setForm({ name: '', email: '', phone: '' });
    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Contact</h3>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <button type="submit">Add</button>
    </form>
  );
}
