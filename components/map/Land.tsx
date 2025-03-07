"use client"
import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Chapter from "./Chapter"
import { useRouter } from "next/navigation"

interface LandProps {
    branchNo: number
    landName: string
    no_of_chapters: number
    imageUrl: string
    clickableDots: { id: number, top: string, left: string, text: string, url: string }[]
}

const Land: React.FC<LandProps> = ({ branchNo, landName, no_of_chapters, imageUrl, clickableDots }) => {
    const router = useRouter()
    const [permission, setPermission] = useState(null)
    const [currentChapter, setCurrentChapter] = useState(1)


    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                let response = await fetch(`/api/permission/${branchNo}`)
                let data = await response.json()
                if (response.ok) {
                    setPermission(data.payload)
                    setCurrentChapter(data.payload.curr_chapter_no)
                } else if (response.status === 404) {
                    // If no permission found, insert a new permission
                    response = await fetch(`/api/permission/${branchNo}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    data = await response.json()
                    if (response.ok) {
                        // refresh the page to get the permission data
                        location.reload()
                    } else {
                        console.error(data.error)
                    }
                } else {
                    console.error(data.error)
                }
            } catch (error) {
                console.error("Failed to fetch permissions:", error)
            }
        }

        fetchPermissions()
    }, [branchNo])

    const handleDotClick = (url: string, isUnlocked: boolean) => {
        if (isUnlocked) {
            router.push(url)
        } else {
            alert("Not Yet!")
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: "2em", textAlign: "center" }}>Welcome to Land {landName}</h1>
            <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
                <Image src={imageUrl} alt={landName} layout="responsive" width={700} height={475} />
                {clickableDots.map(dot => {
                    const isUnlocked = permission ? dot.id <= currentChapter : false
                    return (
                        <div
                            key={dot.id}
                            onClick={() => handleDotClick(dot.url, isUnlocked)}
                            style={{
                                position: "absolute",
                                top: dot.top,
                                left: dot.left,
                                transform: "translate(-50%, -50%)",
                                background: isUnlocked ? "red" : "gray",
                                color: "white",
                                padding: "5px",
                                borderRadius: "50%",
                                textDecoration: "none",
                                cursor: "pointer"
                            }}
                        >
                            {dot.text}
                        </div>
                    )
                })}
            </div>
            {permission && (
                <div>
                    <h2>Permissions:</h2>
                    <pre>{JSON.stringify(permission, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default Land