"use client";

import { useEffect, useRef } from "react";
import LevelNode from "./_components/level-node";
import levels from "./_data/levels";
import Image from "next/image";

const BranchMap = () => {
  const currentLevelRef = useRef<HTMLDivElement>(null);
  const curRank = 7;

  useEffect(() => {
    if (currentLevelRef.current) {
      currentLevelRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  });

  return (
    <div className="p-10">
      <h1 className="text-6xl">Branch X</h1>
      <div
        className="relative h-[50vh] w-full overflow-scroll no-scrollbar border border-red-500 p-10"
        // style={{
        //   backgroundImage: 'url(/water-bg.svg)',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        // }}
        // style={{
        //   position: 'relative',
        //   height: 'calc(100vh - 4rem)', // Adjusting the container height as per need
        // }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/water-bg.svg"
            alt="water background"
            fill
            className="object-cover"
          />
        </div>

        {/* <Image src="/water-bg.svg" alt="water background" fill className="object-cover" /> */}
        {levels && levels.toSorted((a, b) => a.rank - b.rank).map((level, idx) => (
          <>
            <LevelNode
              key={idx}
              level={level}
              isLocked={level.rank > curRank}
              isCurrent={level.rank === curRank}
              ref={currentLevelRef}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default BranchMap;
