"use client";

import React, { useState, useEffect, KeyboardEvent } from 'react';
import Header from './_components/Header';
import Figure from './_components/Figure';
import WrongLetters from './_components/WrongLetters';
import Word from './_components/Word';
import Popup from './_components/Popup';
import Notification from './_components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './hangman.css';

const wordDefinitions: Record<string, string> = {
  function: 'A subroutine or method to achieve a specific task in programming.',
  denominator: 'The number below the line in a fraction that indicates the number of equal parts into which the unit is divided.',
  interface: 'A contract specifying how entities should interact.',
  wizard: 'A skilled practitioner or expert in a particular field.'
};
// Update words to use database 

const terms: string[] = Object.keys(wordDefinitions);
const randomIndex: number = Math.floor(Math.random() * terms.length);
let selectedWord: string = terms[randomIndex];
let selectedDefinition: string = wordDefinitions[selectedWord];

const Hangman: React.FC = () => {
  const [playable, setPlayable] = useState<boolean>(true);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const handleKeydown = (event: KeyboardEvent) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }; // @ts-ignore
    window.addEventListener('keydown', handleKeydown); // @ts-ignore

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  const playAgain = () => {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * terms.length);
    selectedWord = terms[random];
    selectedDefinition = wordDefinitions[selectedWord];
  };
  if (!hydrated) {
    return null;
  }
  return (
    <>
      {hydrated && <Header selectedDefinition={selectedDefinition}/>}
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
};

export default Hangman;
