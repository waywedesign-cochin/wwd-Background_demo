/* eslint-disable @typescript-eslint/no-explicit-any */
import { cases } from "../../../data/dummyData";
import "./../../../css/case-detail.css";

export default function AdminCase({ params }: any) {
  const c = cases.find((x) => x.id === params.id);

  if (!c) {
    return <div className="card">Case not found</div>;
  }

  return (
    <div className="case-wrapper">
      <div className="case-header">
        <div>
          <h2>Case {c.id}</h2>
          <p className="subtitle">Background verification case details</p>
        </div>

        <span className={`status ${c.status.toLowerCase()}`}>
          {c.status}
        </span>
      </div>

      {/* Case Summary */}
      <div className="card section">
        <h3>Candidate Information</h3>

        <div className="info-grid">
          <InfoItem label="Candidate Name" value={c.candidateName} />
          <InfoItem label="Client" value={c.client} />
          <InfoItem label="Case ID" value={c.id} />
          <InfoItem label="Current Status" value={c.status} />
        </div>
      </div>

      {/* Actions */}
      <div className="card section">
        <h3>Actions</h3>

        <div className="action-row">
          <button className="primary">Mark In Progress</button>
          <button className="secondary">Upload Report</button>
          <button className="success">Approve</button>
          <button className="danger">Reject</button>
        </div>
      </div>
    </div>
  );
}

/* Reusable info row */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
