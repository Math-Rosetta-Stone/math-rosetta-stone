"use client"

//refactored everything to Layout component to build practice mode branch
import Layout from "./_components/Layout"

import "./hangman.css"

const Hangman: React.FC = () => {
  return <Layout gameMode={"regular"} />
}

export default Hangman
