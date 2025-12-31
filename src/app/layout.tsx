/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "./globals.css";
import { logout, getRole } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: any) {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(getRole()); // ✅ runs only on client
    setMounted(true);
  }, []);

  if (!mounted) return null; // ✅ CRITICAL

  return (
    <html lang="en">
      <body>
        <header style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Background Verification Platform</span>

          {role && (
            <button
              className="secondary"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </button>
          )}
        </header>

         <main className="app-root">{children}</main>
      </body>
    </html>
  );
}
