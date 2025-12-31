import ProtectedRoute from "@/app/components/ProtectedRoute";
import { cases } from "../../data/dummyData";
import "../../css//admin-dashboard.css";

export default function AdminDashboard() {
  return (
    <ProtectedRoute role="admin">
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <div>
            <h2>Admin Dashboard</h2>
            <p>Background verification case management</p>
          </div>
        </header>

        {/* Summary Cards */}
        <div className="stats-grid">
          <StatCard label="Total Cases" value={cases.length} />
          <StatCard
            label="Pending"
            value={cases.filter((c) => c.status === "Pending").length}
          />
          <StatCard
            label="Approved"
            value={cases.filter((c) => c.status === "Approved").length}
          />
          <StatCard
            label="Rejected"
            value={cases.filter((c) => c.status === "Rejected").length}
          />
        </div>

        {/* Table */}
        <div className="card table-card">
          <h3>Verification Cases</h3>

          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Candidate</th>
                <th>Client</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>

            <tbody>
              {cases.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.candidateName}</td>
                  <td>{c.client}</td>
                  <td>
                    <span className={`status ${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <a href={`/admin/cases/${c.id}`}>
                      <button className="secondary">Open</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/* Small reusable stat card */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
