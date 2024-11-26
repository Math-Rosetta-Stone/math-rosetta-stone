import React from "react"
import Land from "../../components/map/Land"

const clickableDots = [
  { id: 1, top: "40%", left: "15%", text: "Chapter 1", url: "/land1/chapter1" },
  { id: 2, top: "65%", left: "55%", text: "Chapter 2", url: "/land1/chapter2" },
  { id: 3, top: "80%", left: "30%", text: "Chapter 3", url: "/land1/chapter3" },
]

const Land1: React.FC = () => {
  return (
    <Land
      branchNo={1}
      landName="Calculus"
      no_of_chapters={3}
      imageUrl="/land/land1.png"
      clickableDots={clickableDots}
    />
  )
}

export default Land1