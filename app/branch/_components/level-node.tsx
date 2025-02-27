import Link from "next/link";
import { GameType, Level } from "../_data/types";
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

interface LevelNodeProps {
  level: Level;
  isLocked: boolean;
  isCurrent: boolean;
}

const IconWrapper = ({ Icon }: { Icon: React.ElementType }) => (
  <Icon className="w-10 h-10 text-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300" />
);

const LevelNode = ({
  level,
  isLocked,
  isCurrent,
}: LevelNodeProps) => {

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
    <Link
      href={getGameUrl()}
      className={`relative group flex items-center justify-center h-24 w-24 \
        ${isCurrent && "outline outline-4 outline-offset-1 outline-slate-700"} border border-slate-800 rounded-full hover:bg-opacity-50 \
        ${isLocked ? "bg-red-300" : "bg-green-300"}`}
    >
      <div className="absolute opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out font-bold text-5xl">
        {level.rank}
      </div>
      {getGameIcon()}
    </Link>
  );
};

export default LevelNode;
