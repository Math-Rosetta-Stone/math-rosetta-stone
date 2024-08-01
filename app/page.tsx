import { validateRequest } from "@/lib/auth";
import { Form } from "@/lib/form";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { signout } from "./actions";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    // TODO: Move animation to a client component
    // <AnimatePresence>
    //   <motion.div
    //     initial={{ opacity: 0, y: 200 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
    //     className="flex flex-col items-center justify-center text-center"
    //   >
    //     {user && <div>
    //       <div className="text-4xl font-black">
    //         Welcome to Math Rosetta Stone
    //       </div>

    //       <div className="text-2xl font-black">
    //         <Link
    //           href="/signin"
    //           className="ease-in-out duration-200
    //           text-slate-900 hover:text-slate-200
    //           hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
    //           underline underline-offset-2 decoration-dashed decoration-1
    //           hover:no-underline"
    //         >
    //           Sign in
    //         </Link> to get back in action! Don't have an account
    //         ? <Link
    //           href="/signup"
    //           className="ease-in-out duration-200
    //           text-slate-900 hover:text-slate-200
    //           hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
    //           underline underline-offset-2 decoration-dashed decoration-1
    //           hover:no-underline"
    //         >
    //           Sign up
    //         </Link> and start learning!
    //       </div>
    //     </div>}
    //   </motion.div>
    // </AnimatePresence>

    <div
      className="flex flex-col items-center justify-center text-center"
    >
      {!user && <>
        <div className="text-4xl font-black">
          Welcome to Math Rosetta Stone
        </div>

        <div className="text-2xl font-black">
          <Link
            href="/signin"
            className="ease-in-out duration-200
            text-slate-900 hover:text-slate-200
            hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            underline underline-offset-2 decoration-dashed decoration-1
            hover:no-underline"
          >
            Sign in
          </Link> to get back in action! Don't have an account
          ? <Link
            href="/signup"
            className="ease-in-out duration-200
            text-slate-900 hover:text-slate-200
            hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            underline underline-offset-2 decoration-dashed decoration-1
            hover:no-underline"
          >
            Sign up
          </Link> and start learning!
        </div>
      </>}

      {user && <>
        <div className="text-4xl font-black">
          Hello, {user.username}!
        </div>

        <Link
          href="/game"
          className="ease-in-out duration-200
          text-slate-900 hover:text-slate-200
          hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
          underline underline-offset-2 decoration-dashed decoration-1
          hover:no-underline
          text-2xl font-black"
        >
          Go to game
        </Link>

        <Form action={signout}>
          <button
            className="ease-in-out duration-200
            text-slate-900 hover:text-slate-200
            hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            underline underline-offset-2 decoration-dashed decoration-1
            hover:no-underline
            text-2xl font-black"
          >
            Sign out
          </button>
        </Form>

      </>}
    </div>
  );
}
