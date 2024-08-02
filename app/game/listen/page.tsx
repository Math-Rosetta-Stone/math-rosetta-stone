"use client"

import { useContext, useEffect, useState } from "react"
import { cn, getOneRandom, shuffle } from "@/lib/utils"
import { ArrowRight, RotateCcw } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Mcq } from "./_components/Mcq"
import { Button } from "@/components/ui/button"
import { PromptType } from "@/types/mcq"
import { MOCK_DB } from "@/app/map/constants"
import { PracticeModalContext } from "@/app/contexts/practicemodelproviders"
import { useRouter } from "next/navigation"

const TIME_LIMIT = 10 // in seconds

const ListeningGame: React.FC = () => {
  const { gameMode, termsIndex } = useContext(PracticeModalContext)
  const mockDb = gameMode === "practice" ? MOCK_DB.filter((_, index) => termsIndex.includes(index)) : MOCK_DB

  const [hydrated, setHydrated] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [timerStopped, setTimerStopped] = useState(false)
  const [currQuestion, setCurrQuestion] = useState(getOneRandom(mockDb))
  const [availableQuestions, setAvailableQuestions] = useState(mockDb.filter(item => item.term !== currQuestion.term))
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.rate = 0.7
    speechSynthesis.speak(utterance)
  }

  const getRandomPromptType = () => {
    return Math.random() > 0.5 ? PromptType.TERM : PromptType.DEF
  }

  const [currPromptType, setCurrPromptType] = useState(getRandomPromptType())

  const getChoices = (question: { term: string; definition: any }, choiceType: PromptType) => {
    const wrongChoices = shuffle(mockDb.filter(item => item.term !== question.term)).slice(0, 3)
    const choices = shuffle([
      {
        term: choiceType === PromptType.TERM ? question.term : undefined,
        definition: choiceType === PromptType.DEF ? question.definition : undefined,
      },
      ...wrongChoices.map(item => ({
        term: choiceType === PromptType.TERM ? item.term : undefined,
        definition: choiceType === PromptType.DEF ? item.definition : undefined,
      })),
    ])
    return choices
  }
  const [currChoices, setCurrChoices] = useState(getChoices(currQuestion, currPromptType))

  const handleSubmit = () => {
    setTimerStopped(true)
    setFormSubmitted(true)
  }

  const handleResetTimer = () => {
    setTimeLeft(TIME_LIMIT)
    setTimerStopped(false)
  }

  const handleNext = () => {
    if (availableQuestions.length === 0) {
      // if no more questions, stop the game
      // to mark no more questions left
      setCurrQuestion({ ...currQuestion, term: "" })

      // stop the timer and set time left to 0 (purely aesthetic)
      setTimerStopped(true)
      setTimeLeft(0)
    } else {
      // get a new question from available questions
      const newQuestion = getOneRandom(availableQuestions)
      setCurrQuestion(newQuestion)

      const newPromptType = getRandomPromptType()
      setCurrPromptType(newPromptType)

      // get new choices for the new question
      setCurrChoices(getChoices(newQuestion, newPromptType))

      // update available questions
      setAvailableQuestions(availableQuestions.filter(item => item.term !== newQuestion.term))

      // reset timer
      handleResetTimer()
    }

    // reset form submitted
    setFormSubmitted(false)
  }

  const handleRestart = () => {
    // reset all states
    handleResetTimer()
    const newQuestion = getOneRandom(mockDb)
    const newPromptType = getRandomPromptType()
    setCurrQuestion(newQuestion)
    setAvailableQuestions(mockDb.filter(item => item.term !== newQuestion.term))
    setFormSubmitted(false)
    setScore(0)
    setCurrChoices(getChoices(newQuestion, newPromptType))
    setCurrPromptType(newPromptType)
  }

  useEffect(() => {
    fetch("/api/user").then(res => {
      if (res.status === 401) {
        return router.push("/")
      } else if (!res.ok) {
        throw new Error("Failed to fetch user data")
      }
      setIsLoading(false)
      return res.json()
    })
  }, [])

  useEffect(() => {
    setHydrated(true)
    const interval = setInterval(() => {
      if (timeLeft > 0 && !timerStopped) {
        setTimeLeft(prevTime => prevTime - 1)
      } else if (timeLeft === 0 && !formSubmitted) {
        handleSubmit() // Automatically submit when the timer reaches 0
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timerStopped, timeLeft])

  if (!hydrated) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-start mt-2 gap-2 min-h-screen">
      <div className="text-4xl font-black">Listening Game</div>
      <div className="flex flex-col rounded-lg shadow-md border border-neutral-200 w-1/3 pb-2">
        <div className="flex flex-row rounded-t-lg justify-between w-full border-b border-neutral-200 py-2 px-3 bg-slate-50 text-xl font-medium">
          <div>Level #</div>
          <div>{new Date(timeLeft * 1000).toISOString().substring(14, 19)}</div>
        </div>
        <div className="flex flex-row justify-between w-full py-2 px-3 bg-slate-50 text-sm font-medium">
          Match the term/definition corresponding to the term spoken.
        </div>
        {currQuestion.term !== "" && (
          <div className="flex flex-row justify-between w-full pt-2 px-5">
            <div className="flex flex-row justify-start gap-2">
              <div>{`Round: ${mockDb.length - availableQuestions.length}/${mockDb.length}`}</div>
              <div>{`Score: ${score}`}</div>
            </div>
            <ArrowRight
              className={cn(
                "text-slate-300 ease-in duration-150",
                formSubmitted && currQuestion.term !== "" && "text-slate-900 hover:cursor-pointer hover:bg-slate-50"
              )}
              onClick={() => {
                if (formSubmitted && currQuestion.term !== "") handleNext()
              }}
            />
          </div>
        )}
        <AnimatePresence mode="wait">
          {currQuestion.term !== "" ? (
            <motion.div
              key={currQuestion.term}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              <Mcq
                key={availableQuestions.length % 2 === 0 ? 0 : 1} // In order to reset selected choice state after each round
                question={currQuestion}
                choices={currChoices}
                choiceType={currPromptType} // Choices are terms or definitions
                handleSubmit={handleSubmit}
                formSubmitted={formSubmitted}
                updateScore={() => setScore(score + 1)}
                speakWord={speakWord} // Pass speakWord function to Mcq component
              />
            </motion.div>
          ) : (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center">
              <div className="text-center text-xl font-semibold p-3">
                Congratulations! You have completed the game.
                {` You scored ${score}/${mockDb.length}`}
              </div>
              <Button
                className="border hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 ease-in duration-150 disabled:bg-slate-300 disabled:text-slate-900"
                variant="default"
                onClick={handleRestart}>
                <RotateCcw className="mr-2" />
                Restart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ListeningGame
