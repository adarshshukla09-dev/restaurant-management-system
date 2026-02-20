"use client";

import { createAuthClient } from "better-auth/client";
import {  useRouter } from "next/navigation";
import {  useState } from "react";

const authClient = createAuthClient();

export default function LoginPage() {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

 
  const handleGoogle = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithub = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Sign in to your account
        </h1>

        <div className="space-y-4">
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600 disabled:opacity-50"
          >
            Continue with Google
          </button>

          <button
            onClick={handleGithub}
            disabled={loading}
            className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}