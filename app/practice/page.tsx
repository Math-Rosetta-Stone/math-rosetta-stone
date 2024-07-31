"use client"
import { useRouter } from "next/navigation"
import { useEffect, useContext, useState } from "react"
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders"
import { GAMES } from "../map/constants"

const PracticeRedirectPage = () => {
  const [message, setMessage] = useState<string>("")
  const { gameMode, gamesIndex, setGamesIndex } = useContext(PracticeModalContext)
  const router = useRouter()

  const handlePop = () => {
    const copyGamesIndex = [...gamesIndex]
    const currGameIndex = copyGamesIndex.pop()
    setGamesIndex(copyGamesIndex)
    return currGameIndex
  }

  useEffect(() => {
    if (gameMode === "regular") setMessage("Redirecting...")
    const currGameIndex = handlePop()
    if (currGameIndex === undefined) {
      setMessage("No more games left!")
      return
    }
    router.push(`/${GAMES[currGameIndex]}/practice`)
  }, [])

  return <div>{message}</div>
}

export default PracticeRedirectPage
