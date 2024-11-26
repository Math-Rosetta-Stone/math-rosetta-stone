import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ClickableDot {
  id: number;
  top: string;
  left: string;
  text: string;
  url: string;
}

interface LandPageProps {
  title: string;
  imageUrl: string;
  clickableDots?: ClickableDot[];
}

const LandPage: React.FC<LandPageProps> = ({ title, imageUrl, clickableDots = [] }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden no-select p-4">
      <h1 className="text-4xl font-black mb-4 text-center">Welcome to {title}</h1>
      <div className="relative w-full max-w-2xl mx-auto">
        <Image
          src={imageUrl}
          alt={title}
          width={1920}
          height={1080}
          className="w-full h-auto mb-4"
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
      <Link href="/">
        <div className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Back to Main Map
        </div>
      </Link>
    </div>
  );
};

export default LandPage;