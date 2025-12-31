import ProtectedRoute from "@/app/components/ProtectedRoute";
import { cases } from "../../data/dummyData"

export default function ClientDashboard() {
  return (
    <>
      <ProtectedRoute role="client">
        <h2 style={{ marginBottom: 16 }}>Client Dashboard</h2>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Candidate</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.candidateName}</td>
                  <td>{c.type}</td>
                  <td>
                    <span className={`badge ${c.status.includes("Waiting")
                      ? "waiting"
                      : c.status === "Completed"
                        ? "done"
                        : "progress"
                      }`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <a href={`/client/cases/${c.id}`}>
                      <button className="secondary">View</button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></ProtectedRoute>
    </>
  );
}
