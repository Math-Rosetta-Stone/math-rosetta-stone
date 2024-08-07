import Link from "next/link"

const NextGameButton: React.FC = () => {
  return (
    <div
      className="sticky top-0 flex flex-row justify-start items-center
          w-full h-10 pt-2 px-3 backdrop-blur-sm
          font-black">
      <Link
        href="/game/permission"
        className="rounded-md p-1
            ease-in-out duration-200
            text-slate-900
            underline underline-offset-2 decoration-dashed decoration-1 decoration-slate-900
            hover:text-slate-50 hover:bg-slate-900 hover:decoration-slate-50">
        Leave Game
      </Link>
    </div>
  )
}

export default NextGameButton
