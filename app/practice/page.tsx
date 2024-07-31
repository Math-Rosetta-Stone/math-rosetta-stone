"use client"
import { useRouter } from "next/navigation"
import { useEffect, useContext, useState } from "react"
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders"
import { GAMES } from "../map/constants"

const PracticeRedirectPage = () => {
  const [message, setMessage] = useState<string>("Redirecting...")
  const { gameMode, gamesIndex, setGamesIndex } = useContext(PracticeModalContext)
  const router = useRouter()

  const handlePop = () => {
    const copyGamesIndex = [...gamesIndex]
    const currGameIndex = copyGamesIndex.pop()
    setGamesIndex(copyGamesIndex)
    return currGameIndex
  }

  useEffect(() => {
    const currGameIndex = handlePop()
    if (gameMode === "regular" || currGameIndex === undefined) {
      setMessage("No more games left. Redirecting to select games...")
      router.push("/map")
      return
    }
    router.push(`/practice/${GAMES[currGameIndex]}`)
  }, [])

  return <div>{message}</div>
}

export default PracticeRedirectPage
