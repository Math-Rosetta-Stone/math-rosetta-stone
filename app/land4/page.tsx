import React from "react";
import LandPage from "../map/_components/LandPage";

const clickableDots = [
  { id: 1, top: "40%", left: "15%", text: "Dot 1", url: "/land1/path1" },
  { id: 2, top: "65%", left: "55%", text: "Dot 2", url: "/land1/path2" },
];

const Land4: React.FC = () => {
  return <LandPage title="Land 4" imageUrl="/land/land4.png" clickableDots={clickableDots} />;
};

export default Land4;