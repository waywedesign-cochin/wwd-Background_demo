"use client";
import { useRouter } from "next/navigation";
import { login } from "@/utils/auth";
import "../../css/admin-login.css";

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = () => {
    login("admin");
    router.push("/admin/dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Admin Login</h2>
        <p className="subtitle">
          Access the background verification dashboard
        </p>

        <div className="demo-box">
          <strong>Demo Access</strong>
          <p>No username or password required</p>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login as Admin
        </button>

        <p className="footer-text">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
