"use client";

import { revertUserPermissions } from "../actions";
import { useEffect, useState } from "react";

type User = {
  id: string;
  is_admin: boolean;
};

export function AdminUtils() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user?.is_admin) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <form
        action={async () => {
          await revertUserPermissions(user.id);
          window.location.reload();
        }}>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg">
          Revert Permissions
        </button>
      </form>
    </div>
  );
}
