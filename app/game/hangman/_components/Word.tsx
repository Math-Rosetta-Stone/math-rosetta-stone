import React from 'react';

interface WordProps {
  selectedWord: string;
  correctLetters: string[];
}

const Word: React.FC<WordProps> = ({ selectedWord, correctLetters }) => {
  if (!selectedWord) return null;
  
  return (
    <div className="word">
      {selectedWord.split('').map((letter, i) => {
        const letterLower = letter.toLowerCase();
        const isGuessed = correctLetters.includes(letterLower);
        const isSpace = letter === ' ';
        return (
          <span className={`letter ${isSpace ? 'space' : ''}`} key={i}>
            {isSpace ? '\u00A0' : isGuessed ? letter : ''}
          </span>
        );
      })}
    </div>
  );
}

export default Word;