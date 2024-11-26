"use client"
import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ChapterProps {
    chapterNo: number
    branchNo: number
    landName: string
    numberOfLevels: number
}

const Chapter: React.FC<ChapterProps> = ({ chapterNo, branchNo, landName, numberOfLevels }) => {
    const router = useRouter()
    const [permission, setPermission] = useState(null)
    const [currentLevel, setCurrentLevel] = useState(0)
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null)


    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await fetch(`/api/permission/${branchNo}`)
                const data = await response.json()
                if (response.ok) {
                    setPermission(data.payload)

                    if (data.payload.curr_chapter_no === chapterNo) {
                        setCurrentLevel(data.payload.curr_level_no)
                    } else if (data.payload.curr_chapter_no > chapterNo) {
                        setCurrentLevel(numberOfLevels)
                    } else {
                        //reset the current level indicating the chapter is not yet unlocked
                        setCurrentLevel(0)
                        //redirect to the land page
                        router.push(`/land${branchNo}`)
                    }
                } else {
                    console.error(data.error)
                }
            } catch (error) {
                console.error("Failed to fetch permissions:", error)
            }
        }

        fetchPermissions()
    }, [branchNo, chapterNo, numberOfLevels, router])


    const handleLevelClick = (levelNo: number, isUnlocked: boolean) => {
        if (isUnlocked) {
            setSelectedLevel(levelNo)
        } else {
            alert("Not Yet, Study more")
        }
    }

    const handlePass = async () => {
        // only update the permission if the selected level is the current level
        if (selectedLevel !== null && selectedLevel === currentLevel) {
            let newChapterNo = chapterNo
            let newLevelNo = selectedLevel + 1

            if (selectedLevel === numberOfLevels) {
                newChapterNo += 1
                newLevelNo = 1
                // update the current level to number of level + 1
                // to indicate the chapter is finished
                setCurrentLevel(currentLevel + 1)
            }

            try {
                const response = await fetch(`/api/permission/${branchNo}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        updatedChapterNo: newChapterNo,
                        updatedLevelNo: newLevelNo,
                    }),
                })
                const data = await response.json()
                if (response.ok) {
                    setPermission(data.payload)
                    setSelectedLevel(null)
                } else {
                    console.error(data.error)
                }
            } catch (error) {
                console.error("Failed to update permissions:", error)
            }
        }
        setSelectedLevel(null)
        // refresh the page to get the updated permission data
        location.reload()
    }

    const handleFail = () => {
        alert("Try again!")
        setSelectedLevel(null)
    }

    const handleGoBack = () => {
        router.push(`/land${branchNo}`)
    }


    return (
        <div>
            <h1>Welcome to Land {landName} Chapter {chapterNo}</h1>
            <h2>Current Level: {currentLevel}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {Array.from({ length: numberOfLevels }, (_, index) => {
                    const levelNo = index + 1
                    const isUnlocked = currentLevel >= levelNo
                    return (
                        <div
                            key={index}
                            onClick={() => handleLevelClick(levelNo, isUnlocked)}
                            style={{
                                width: "100px",
                                height: "100px",
                                background: isUnlocked ? "blue" : "gray",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: isUnlocked ? "pointer" : "not-allowed"
                            }}
                        >
                            Level {levelNo}
                        </div>
                    )
                })}
            </div>
            {selectedLevel !== null && (
                <div>
                    <h2>Level {selectedLevel}</h2>
                    <button onClick={handlePass}>Pass</button>
                    <button onClick={handleFail}>Fail</button>
                </div>
            )}
            <button onClick={handleGoBack}>Go Back to Land</button>
        </div>
    )
}

export default Chapter