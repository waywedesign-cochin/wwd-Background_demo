/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/client/cases/[id]/page.tsx
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { cases } from "../../../data/dummyData";

export default function ClientCase({ params }: any) {
  const c = cases.find((x) => x.id === params.id);

  return (
    <ProtectedRoute role="client">
    <div className="card">
      <h2>Case Details</h2>
      <p><strong>Case ID:</strong> {c?.id}</p>
      <p><strong>Candidate:</strong> {c?.candidateName}</p>
      <p><strong>Status:</strong> {c?.status}</p>

      {c?.status === "Completed" && (
        <button>Download Report</button>
      )}
    </div></ProtectedRoute>
  );
}
