"use client"
import { useRouter } from "next/navigation"
import { useEffect, useContext } from "react"
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders"
import { GAMES } from "../map/constants"

const PracticeRedirectPage = () => {
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
    if (currGameIndex === undefined) return
    router.push(`/${GAMES[currGameIndex]}/practice`)
  }, [])

  return <div>Redirecting...</div>
}

export default PracticeRedirectPage
