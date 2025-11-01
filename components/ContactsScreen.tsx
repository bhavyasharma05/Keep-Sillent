import React, { useState, useEffect } from 'react';
import { Contact, View } from '../types';
import {
  getContacts,
  saveContacts,
  getImportantContacts,
  saveImportantContacts,
} from '../services/contactService';
import { ArrowLeftIcon, StarIcon, UserPlusIcon } from '../constants';

interface ContactsScreenProps {
  onNavigate: (view: View) => void;
}

const ContactsScreen: React.FC<ContactsScreenProps> = ({ onNavigate }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [importantContacts, setImportantContacts] = useState<Set<string>>(new Set());
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  useEffect(() => {
    setContacts(getContacts());
    setImportantContacts(new Set(getImportantContacts()));
  }, []);

  const toggleImportant = (phone: string) => {
    const updated = new Set(importantContacts);
    if (updated.has(phone)) {
      updated.delete(phone);
    } else {
      updated.add(phone);
    }
    setImportantContacts(updated);
    saveImportantContacts(Array.from(updated));
  };
  
  const handleAddContact = () => {
    if (newContactName && newContactPhone) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: newContactName,
        phone: newContactPhone,
      };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      saveContacts(updatedContacts);
      setNewContactName('');
      setNewContactPhone('');
    }
  };

  return (
    <div className="py-8 space-y-6">
      <header className="flex items-center space-x-4">
        <button onClick={() => onNavigate(View.Home)} className="p-2 rounded-full hover:bg-gray-700">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold">Important Contacts</h1>
      </header>
      
      <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
        <h2 className="text-lg font-semibold px-2">Add New Contact</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                placeholder="Name"
                className="flex-grow bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
                type="tel"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                placeholder="Phone Number"
                className="flex-grow bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                onClick={handleAddContact}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
            >
                <UserPlusIcon className="w-5 h-5"/>
                <span>Add</span>
            </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-2">
        <ul className="divide-y divide-gray-700">
          {contacts.length > 0 ? contacts.map((contact) => (
            <li key={contact.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-gray-400">{contact.phone}</p>
              </div>
              <button onClick={() => toggleImportant(contact.phone)}>
                <StarIcon
                  className={`w-8 h-8 transition-colors duration-300 ${
                    importantContacts.has(contact.phone)
                      ? 'text-yellow-400'
                      : 'text-gray-600 hover:text-yellow-300'
                  }`}
                />
              </button>
            </li>
          )) : (
            <p className="text-center text-gray-400 p-8">No contacts found. Add some to get started!</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContactsScreen;
