/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CandidateStepper from "@/app/components/candidateStepper";
import '../../../css/consent.css'

export default function ConsentPage({ params }: any) {
  const router = useRouter();
   const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (!agreed) return;
    console.log("Consent accepted");
 router.push(`/candidate/${params.caseId}/form`)
  };
  return (
    <>

      <CandidateStepper currentStep="consent" />
      <div className="card">

  <div className="consent-wrapper">
      <h2>Consent & Authorization</h2>
      <p className="subtitle">
        Please review and provide your consent to continue
      </p>

      <div className="consent-box">
        <ul>
          <li>Verify your identity using secure methods</li>
          <li>Process and fulfill your service request</li>
          <li>Store your information as per regulations</li>
        </ul>
      </div>

      <label className="consent-checkbox">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          style={{width:'5%'}}
        />
        <span>
          I agree to the{" "}
          <a href="/terms" target="_blank">Terms & Conditions</a> and{" "}
          <a href="/privacy" target="_blank">Privacy Policy</a>
        </span>
      </label>

      <button
        className="continue-btn"
        disabled={!agreed}
        onClick={handleContinue}
      >
        Continue
      </button>

      <div className="consent-footer">
        Your data is encrypted and handled securely.
      </div>
    </div>
      </div>
    </>
  );
}