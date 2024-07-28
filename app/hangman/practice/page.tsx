"use client"

import Layout from "../_components/Layout"
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders"
import { useContext } from "react"
import "../hangman.css"

const Hangman: React.FC = () => {
  const { termsIndex } = useContext(PracticeModalContext)
  return <Layout gameMode="practice" termsIndex={termsIndex} />
}

export default Hangman
