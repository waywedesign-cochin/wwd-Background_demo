"use client";
import "./css/home.css";

export default function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="hero-card">
        <h1>Background Verification Platform</h1>
        <p className="subtitle">
          Secure, reliable, and streamlined background verification workflow
        </p>

        <div className="action-buttons">
          <a href="/candidate/BG-2024-001" className="primary-btn">
            Start Candidate Verification
          </a>

          <a href="/admin/login" className="secondary-btn">
            Admin Login
          </a>
        </div>

        <div className="info-grid">
          <div className="info-box">
            <h3>For Candidates</h3>
            <p>
              Submit personal details, upload documents, verify identity, and
              track verification status easily.
            </p>
          </div>

          <div className="info-box">
            <h3>For Admins</h3>
            <p>
              Review submissions, validate documents, manage cases, and approve
              verifications efficiently.
            </p>
          </div>
        </div>

        <footer className="footer-text">
          © 2025 Background Verification App · Frontend POC
        </footer>
      </div>
    </div>
  );
}
