/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/candidate/[caseId]/page.tsx
export default function CandidateLanding({ params }: any) {
  return (
    <div className="card">
      <h2>Background Verification</h2>
      <p><strong>Case ID:</strong> {params.caseId}</p>

      <ol style={{ margin: "16px 0" }}>
        <li>Verify mobile</li>
        <li>Consent</li>
        <li>Fill details</li>
        <li>Upload documents</li>
        <li>Submit</li>
      </ol>

      <a href={`/candidate/${params.caseId}/otp`}>
        <button>Start Verification</button>
      </a>
    </div>
  );
}
