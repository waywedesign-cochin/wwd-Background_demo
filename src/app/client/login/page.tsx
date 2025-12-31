"use client";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth";

export default function ClientLogin() {
  const router = useRouter();

  const handleLogin = () => {
    login("client");
    router.push("/client/dashboard");
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Client Login</h2>
      <p>Demo login (no password)</p>

      <button onClick={handleLogin} style={{ width: "100%" }}>
        Login as Client
      </button>
    </div>
  );
}
