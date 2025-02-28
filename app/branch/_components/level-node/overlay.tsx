import { Level } from "../../_data/types";

interface OverlayProps {
  level: Level;
}

const Overlay = ({
  level,
}: OverlayProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center h-full w-full opacity-0 group-hover:opacity-100 group-hover:backdrop-brightness-75 transition-opacity ease-in duration-100 font-bold text-5xl">
      <span>{level.rank}</span>
    </div>
  );
};

export default Overlay;
