import React from 'react';

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.807 1.442l.74 4.153a1.875 1.875 0 01-1.161 2.021l-1.053.352a11.954 11.954 0 006.254 6.254l.352-1.053a1.875 1.875 0 012.021-1.161l4.153.74c.856.197 1.442.947 1.442 1.807v1.372a3 3 0 01-3 3h-1.372c-5.083 0-9.667-1.97-13.16-5.464A15.111 15.111 0 011.5 5.872V4.5z" clipRule="evenodd" />
    </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
    </svg>
);

export const UserPlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63A13.067 13.067 0 0110.5 21.75c-2.593 0-5.131-.69-7.386-1.863a.75.75 0 01-.364-.63l-.001-.12v-.002zM16.125 16.125a3 3 0 100-6 3 3 0 000 6z" />
        <path d="M18.75 16.125a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" />
        <path d="M16.125 18.75a.75.75 0 001.5 0v-1.5a.75.75 0 00-1.5 0v1.5z" />
    </svg>
);
