import React from "react";
import Image from "next/image";
import Link from "next/link";

const clickableDots = [
  { id: 1, top: "40%", left: "15%", text: "Dot 1", url: "/land1" },
  { id: 2, top: "65%", left: "55%", text: "Dot 2", url: "/land2" },
  { id: 3, top: "55%", left: "70%", text: "Dot 3", url: "/land3" },
  { id: 4, top: "10%", left: "50%", text: "Dot 4", url: "/land4" },
];

const MainMap: React.FC = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden no-select">
      <Image
        src="/intermap.png"
        alt="Intermap"
        layout="responsive"
        width={1920} 
        height={1080} 
        className="w-full h-auto"
      />
      {clickableDots.map((dot) => (
        <Link key={dot.id} href={dot.url} legacyBehavior>
          <a
            className="absolute bg-red-500 rounded-full w-4 h-4 cursor-pointer"
            style={{ top: dot.top, left: dot.left }}
            title={dot.text}
          />
        </Link>
      ))}
    </div>
  );
};

export default MainMap;