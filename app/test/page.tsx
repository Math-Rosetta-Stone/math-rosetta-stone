"use client"
import { PracticeModalContext } from "../contexts/practicemodelproviders"
import { useContext } from "react"
export default function Test() {
  const { termsIndex, gamesIndex } = useContext(PracticeModalContext)
  return <div>{termsIndex.toString() + gamesIndex.toString()}</div>
}
