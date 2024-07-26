"use client"
import { PracticeModalContext } from "../contexts/practicemodelproviders"
import { useContext } from "react"
export default function Test() {
  const { TermsIndex, selectedGames } = useContext(PracticeModalContext)

  // Add logic for testing here
  return <div>{TermsIndex.toString() + selectedGames.toString()}</div>
}
