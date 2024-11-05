import React from "react";
import LandPage from "../map/_components/LandPage";

const clickableDots = [
  { id: 1, top: "40%", left: "15%", text: "Dot 1", url: "/land1/path1" },
  { id: 2, top: "65%", left: "55%", text: "Dot 2", url: "/land1/path2" },
];

const Land3: React.FC = () => {
  return <LandPage title="Land 3" imageUrl="/land/land3.png" clickableDots={clickableDots} />;
};

export default Land3;