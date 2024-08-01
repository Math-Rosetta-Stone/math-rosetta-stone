"use server";

import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signout() {
	const { user } = await validateRequest();
	if (!user) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(user.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
	return redirect("/");
}
