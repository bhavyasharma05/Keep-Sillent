import React, { useState, useEffect, useCallback } from 'react';
import { View } from '../types';
import { getImportantContacts, getContactByPhone } from '../services/contactService';
import { getWittyReply } from '../services/geminiService';
import { PhoneIcon } from '../constants';

interface HomeScreenProps {
  onNavigate: (view: View) => void;
}

const Toggle: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
      enabled ? 'bg-indigo-600' : 'bg-gray-700'
    }`}
  >
    <span
      className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${
        enabled ? 'translate-x-9' : 'translate-x-1'
      }`}
    />
  </button>
);

const IncomingCallDisplay: React.FC<{
  callerName: string;
  callerNumber: string;
  isImportant: boolean;
  onHangup: () => void;
}> = ({ callerName, callerNumber, isImportant, onHangup }) => {
  const [wittyReply, setWittyReply] = useState('');
  const [isLoadingReply, setIsLoadingReply] = useState(false);

  const handleGetReply = async () => {
    setIsLoadingReply(true);
    try {
      const reply = await getWittyReply(callerName);
      setWittyReply(reply);
    } catch (error) {
      console.error('Failed to get witty reply:', error);
      setWittyReply('Could not get a reply. Maybe just say hello?');
    }
    setIsLoadingReply(false);
  };
  
  const bgColor = isImportant ? 'bg-gradient-to-br from-green-500 to-teal-600' : 'bg-gradient-to-br from-gray-700 to-gray-800';
  const ringClass = isImportant ? 'animate-pulse' : '';
  const textColor = isImportant ? 'text-white' : 'text-gray-400';

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 ${bgColor}`}>
      <div className={`absolute inset-0 border-8 ${isImportant ? 'border-green-300/50' : 'border-gray-600/50'} rounded-3xl animate-pulse`}></div>
      <div className={`absolute inset-2 border-4 ${isImportant ? 'border-green-300/30' : 'border-gray-600/30'} rounded-2xl animate-pulse delay-100`}></div>
      
      <p className={`${textColor} mb-2`}>Incoming Call {isImportant ? '(Important)' : '(Silenced)'}</p>
      <h2 className={`text-4xl font-bold mb-1 ${isImportant ? 'text-white' : 'text-white'}`}>{callerName}</h2>
      <p className="text-lg text-gray-200 mb-8">{callerNumber}</p>
      
      <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-12">
        <PhoneIcon className={`w-12 h-12 text-white ${ringClass}`} />
      </div>

      <div className="w-full max-w-sm mb-8">
        <button
          onClick={handleGetReply}
          disabled={isLoadingReply}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {isLoadingReply ? 'Thinking...' : '✨ Suggest a Witty Reply'}
        </button>
        {wittyReply && (
          <div className="mt-4 p-3 bg-black/20 rounded-lg text-center">
            <p className="text-sm text-gray-200">{wittyReply}</p>
          </div>
        )}
      </div>

      <button
        onClick={onHangup}
        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
      >
        <PhoneIcon className="w-8 h-8 text-white transform rotate-[135deg]" />
      </button>
    </div>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [isSmartSilent, setIsSmartSilent] = useState(false);
  const [simulatedNumber, setSimulatedNumber] = useState('');
  const [incomingCall, setIncomingCall] = useState<{ number: string; name: string; isImportant: boolean } | null>(null);
  
  const importantContacts = getImportantContacts();

  const handleSimulateCall = () => {
    if (!simulatedNumber) return;

    const isImportant = importantContacts.includes(simulatedNumber);
    const contact = getContactByPhone(simulatedNumber);
    const callerName = contact ? contact.name : 'Unknown Caller';

    if (!isSmartSilent || (isSmartSilent && isImportant)) {
      setIncomingCall({
        number: simulatedNumber,
        name: callerName,
        isImportant: isImportant
      });
    } else {
      // Show a subtle notification for silenced calls
      alert(`Silenced call from ${callerName} (${simulatedNumber})`);
    }
    setSimulatedNumber('');
  };

  const handleHangup = () => {
    setIncomingCall(null);
  };

  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-400">Web Smart Ringer</h1>
        <p className="text-gray-400 mt-2">Never miss an important call again.</p>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Smart Silent Mode</h2>
            <p className="text-sm text-gray-400">Only rings for important contacts.</p>
          </div>
          <Toggle enabled={isSmartSilent} onChange={setIsSmartSilent} />
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-center">Test The System</h2>
        <p className="text-sm text-gray-400 text-center">Enter a number to simulate an incoming call.</p>
        <div className="flex space-x-2">
          <input
            type="tel"
            value={simulatedNumber}
            onChange={(e) => setSimulatedNumber(e.target.value)}
            placeholder="Enter phone number"
            className="flex-grow bg-gray-700 border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
          <button
            onClick={handleSimulateCall}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Call
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => onNavigate(View.Contacts)}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Manage Important Contacts
        </button>
      </div>

      {incomingCall && (
        <IncomingCallDisplay
          callerName={incomingCall.name}
          callerNumber={incomingCall.number}
          isImportant={incomingCall.isImportant}
          onHangup={handleHangup}
        />
      )}
    </div>
  );
};

export default HomeScreen;
