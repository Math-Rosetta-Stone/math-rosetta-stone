import React from "react"


interface LevelProps {
    chapterNo: number
    levelNo: number
}

const Level: React.FC<LevelProps> = ({ chapterNo, levelNo }) => {
    return (
        <div>
            <h3>Level</h3>
            <p>Chapter No: {chapterNo}</p>
            <p>Level No: {levelNo}</p>
        </div>
    )
}

export default Level