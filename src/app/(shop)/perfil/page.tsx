"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <h3 className="text-3xl mb-10">{session?.user?.role}</h3>
    </div>
  );
}
