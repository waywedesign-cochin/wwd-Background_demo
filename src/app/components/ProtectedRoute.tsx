"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role, isAuthorized } from "@/utils/auth";

export default function ProtectedRoute({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized(role)) {
      router.replace(`/${role}/login`);
    }
  }, [role, router]);

  return <>{children}</>;
}
