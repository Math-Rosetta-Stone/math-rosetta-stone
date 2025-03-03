import { GamePositionContext } from "@/app/contexts/gamepositionproviders";
import { usePermission } from "@/app/hook/usePermission";
import Link from "next/link";
import { useContext } from "react";

const NextGameButton: React.FC = () => {
  const { updatePermission } = usePermission();
  const { currBranch, incrementGamePosition } = useContext(GamePositionContext);

  return (
    <div
      className="sticky top-0 flex flex-row justify-start items-center
          w-full h-10 pt-2 px-3 backdrop-blur-sm
          font-black">
      <Link
        href="/map"
        className="rounded-md p-1
            ease-in-out duration-200
            text-slate-900
            underline underline-offset-2 decoration-dashed decoration-1 decoration-slate-900
            hover:text-slate-50 hover:bg-slate-900 hover:decoration-slate-50">
        Leave Game
      </Link>
    </div>
  );
};

export default NextGameButton;
