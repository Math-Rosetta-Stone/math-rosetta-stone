import React from "react";
import LandPage from "../map/_components/LandPage";

const clickableDots = [
  { id: 1, top: "40%", left: "15%", text: "Dot 1", url: "/path1" },
  { id: 2, top: "65%", left: "55%", text: "Dot 2", url: "/path2" },
];


const Land1: React.FC = () => {
  return <LandPage title="Land 1" imageUrl="/land/land1.png" clickableDots={clickableDots} />;
};

export default Land1;