import { Contact } from '../types';

const CONTACTS_KEY = 'smartSilentContacts';
const IMPORTANT_CONTACTS_KEY = 'smartSilentImportant';

const mockContacts: Contact[] = [
  { id: '1', name: 'Mom', phone: '1112223333' },
  { id: '2', name: 'Dr. Smith', phone: '4445556666' },
  { id: '3', name: 'Boss', phone: '7778889999' },
  { id: '4', name: 'Jane Doe', phone: '1234567890' },
  { id: '5', name: 'Pizza Place', phone: '0987654321' },
];

// Initialize with mock data if none exists
const initializeContacts = () => {
  const existing = localStorage.getItem(CONTACTS_KEY);
  if (!existing || JSON.parse(existing).length === 0) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(mockContacts));
  }
};

initializeContacts();

export const getContacts = (): Contact[] => {
  const contactsJson = localStorage.getItem(CONTACTS_KEY);
  return contactsJson ? JSON.parse(contactsJson) : [];
};

export const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
};

export const getContactByPhone = (phone: string): Contact | undefined => {
  const contacts = getContacts();
  return contacts.find(c => c.phone === phone);
};

export const getImportantContacts = (): string[] => {
  const importantJson = localStorage.getItem(IMPORTANT_CONTACTS_KEY);
  return importantJson ? JSON.parse(importantJson) : [];
};

export const saveImportantContacts = (important: string[]) => {
  localStorage.setItem(IMPORTANT_CONTACTS_KEY, JSON.stringify(important));
};
