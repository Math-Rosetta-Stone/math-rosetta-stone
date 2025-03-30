"use client"

import React from "react"
import { useState, useEffect } from "react"



// This is a client component
// This function fetches data from the server
const getLevelData = async (branchNo: number, chapterNo: number) => {
  const response = await fetch(`/api`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branchNo, chapterNo }),
    }
  )
  const data = await response.json()
  return data
}

export default function Page() {
  const [levelData, setLevelData] = useState(null)

  const handleGetLevelData = async () => {

    const data = await getLevelData(1, 1)
    setLevelData(data)
  }

  return (
    <div>
      <button onClick={handleGetLevelData}>Get Level Data</button>
      <pre>{JSON.stringify(levelData, null, 2)}</pre>
    </div>
  )
}
