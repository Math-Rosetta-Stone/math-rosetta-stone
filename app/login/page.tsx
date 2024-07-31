"use client";

import Link from "next/link";

const Login = () => {
  return (
    <div>
      <div>Login Page</div>
      <Link href="/register">Register</Link>
    </div>
  );
};

export default Login;