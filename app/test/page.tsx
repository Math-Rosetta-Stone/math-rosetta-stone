"use client"
import { PracticeModalContext } from "../contexts/practicemodelproviders"
import { useContext } from "react"
export default function Test() {
  const { termsIndex } = useContext(PracticeModalContext)
  return <div>{termsIndex.toString()}</div>
}
