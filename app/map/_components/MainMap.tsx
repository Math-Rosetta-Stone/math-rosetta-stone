import React from "react";
import Image from "next/image";

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
    </div>
  );
};

export default MainMap;
