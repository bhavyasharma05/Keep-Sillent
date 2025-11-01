import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ContactsScreen from './components/ContactsScreen';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);

  const navigateTo = (view: View) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="max-w-lg mx-auto p-4">
        {currentView === View.Home ? (
          <HomeScreen onNavigate={navigateTo} />
        ) : (
          <ContactsScreen onNavigate={navigateTo} />
        )}
      </main>
      <footer className="text-center text-gray-500 text-xs py-4 fixed bottom-0 w-full">
        <p>Web Smart Ringer &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
