"use client"

import Layout from "../_components/layout"
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders"
import { useContext } from "react"

const Hangman: React.FC = () => {
  const { termsIndex } = useContext(PracticeModalContext)
  return <Layout gameMode="practice" termsIndex={termsIndex} />
}

export default Hangman
