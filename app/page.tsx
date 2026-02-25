import { auth } from "@/lib/utils/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      {session?.user ? (
        <p>Hello {session.user.name}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}