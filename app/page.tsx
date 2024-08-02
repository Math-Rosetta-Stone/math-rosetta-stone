"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { signout } from "./actions";

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  const handleSignout = async () => {
    try {
      const response = await signout();
      if (response.success) {
        setUser(null);
        setAnimationKey((prev) => prev + 1);
      } else {
        console.error("Signout error", response.error);
      }
    } catch (error) {
      console.error("Signout error", error);
    }
  };

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json()
      })
      .then((data) => {
        console.log("DATA", data);
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("ERROR", error);
        setUser(null);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
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

          <div className="max-w-40 text-wrap" >{JSON.stringify(user)}</div>

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

          <button
            onClick={handleSignout}
            className="ease-in-out duration-200
            text-slate-900 hover:text-slate-200
            hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
            underline underline-offset-2 decoration-dashed decoration-1
            hover:no-underline
            text-2xl font-black"
          >
            Sign out
          </button>
        </>}
      </motion.div>
    </AnimatePresence>
  );
}
