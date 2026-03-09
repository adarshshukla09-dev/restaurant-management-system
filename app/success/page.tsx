"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) return;

    fetch("/api/stripe/verify-payment", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    });
  }, []);

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
    </div>
  );
}