import React from 'react';

interface WrongLettersProps {
  wrongLetters: string[];
}

const WrongLetters: React.FC<WrongLettersProps> = ({ wrongLetters }) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && 
          <p>Wrong</p>
        }
        {wrongLetters
          .map((letter, i) => <span key={i}>{letter}</span>)
          .reduce<React.ReactNode[]>((prev, curr) => prev === null ? [curr] : [curr , ', ', ...prev], [])}
      </div>
    </div>
  );
}

export default WrongLetters;
