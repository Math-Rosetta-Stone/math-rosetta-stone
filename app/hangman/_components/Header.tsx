import React from 'react';

interface HeaderProps {
  selectedDefinition?: string; 
}

const Header: React.FC<HeaderProps> = ({ selectedDefinition }) => {
  return (
    <>
      <h1>Hangman</h1>
      <p>Find the hidden word - Enter a letter</p>
      {selectedDefinition && (
        <p>Definition: {selectedDefinition}</p>
      )}
    </>
  );
}

export default Header;
