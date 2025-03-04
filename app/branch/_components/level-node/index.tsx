import { forwardRef } from "react";
import Link from "next/link";
import { GameType, Level } from "../../_data/types";
import {
  PersonStanding,
  ClipboardList,
  Type
} from "lucide-react";
import {
  FaQuestion,
} from "react-icons/fa";
import {
  GrShareOption,
} from "react-icons/gr";
import {
  FaEarListen,
} from "react-icons/fa6";
import {
  TbMathFunction,
} from "react-icons/tb";
import Overlay from "./overlay";

interface LevelNodeProps {
  level: Level;
  isLocked: boolean;
  isCurrent: boolean;
}

const IconWrapper = ({ Icon }: { Icon: React.ElementType }) => (
  <Icon className="absolute inset-0 h-full w-full opacity-100 group-hover:opacity-0 transition-opacity ease-in duration-100 text-slate-800 p-3" />
);

const LevelNode = forwardRef<HTMLDivElement, LevelNodeProps>(({
  level,
  isLocked,
  isCurrent,
}, ref) => {

  const getGameUrl = () => {
    let game = level.game;
    if (level.game === GameType.MYSTERY) {
      const values = Object.values(GameType).filter(g => g !== GameType.MYSTERY);
      game = values[Math.floor(Math.random() * values.length)];
    }
    return "/" + game;
  };

  const getGameIcon = () => {
    const iconMap: Record<GameType, React.ElementType> = {
      [GameType.FIB]: Type,
      [GameType.HANGMAN]: PersonStanding,
      [GameType.LISTEN]: FaEarListen,
      [GameType.LOGO]: TbMathFunction,
      [GameType.MATCHING]: GrShareOption,
      [GameType.MCQ]: ClipboardList,
      [GameType.MYSTERY]: FaQuestion,
    };
    return <IconWrapper Icon={iconMap[level.game]} />;
  };

  return (
    <div
      ref={isCurrent ? ref : undefined}
      className="absolute"
      style={{
        top: `${level.position.y}px`,
        left: `${level.position.x}px`,
      }}
    >
      <Link href={getGameUrl()} className={`${isLocked && "pointer-events-none"}`}>
        <div
          className={`relative group aspect-square h-20 w-20 overflow-hidden border border-slate-800 rounded-full \
          ${isCurrent && "outline outline-4 outline-offset-1 outline-slate-700 bg-amber-300"} \
          ${!isCurrent && (isLocked ? "bg-red-300" : "bg-green-300")}`}
        >
          {getGameIcon()}
          <Overlay level={level} />
        </div>
      </Link>
    </div>
  );
});

export default LevelNode;
