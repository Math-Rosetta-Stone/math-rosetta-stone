import Link from "next/link";
import { redirect } from "next/navigation";

import { signin } from "./actions";

import { Form } from "@/lib/form";
import { validateRequest } from "@/lib/auth";

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		return redirect("/");
	}
	return (
		<>
			<h1>Sign in</h1>
			<Form action={signin}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</Form>
			<Link href="/signup">Create an account</Link>
		</>
	);
}