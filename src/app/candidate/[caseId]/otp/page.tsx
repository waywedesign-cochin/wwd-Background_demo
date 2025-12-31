/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/candidate/[caseId]/otp/page.tsx
"use client";
import { useRef, useState } from "react";
import CandidateStepper from "../../../components/candidateStepper";
import { useRouter } from "next/navigation";
import '../../../css/otp.css'

export default function OTPPage({ params }: any) {
  const router = useRouter();
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === '111111') {
      router.push(`/candidate/${params.caseId}/consent`)
    }
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""))
  };

  return (
    <>
      <CandidateStepper currentStep="otp" />

      <div className="card">
        <div className="otp-wrapper">
          <h2>Verify OTP</h2>
          <p>Enter the 6-digit code sent to your mobile</p>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { (inputsRef.current[index] = el) }}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{ width: '4rem', height: '4rem', margin: '.5rem' }}
              />
            ))}
          </div>

          <button className="verify-btn" onClick={handleVerify}>
            Verify OTP
          </button>

          <div className="otp-footer">
            <span>Didn’t receive OTP?</span>
            <button className="link-btn" onClick={handleResend}>Resend</button>
          </div>
        </div>


        {/* <input placeholder="Enter OTP" style={{ width: '50%' }} />
        <button
          onClick={() =>
            router.push(`/candidate/${params.caseId}/consent`)
          }
        >
          Verify
        </button> */}
      </div>
    </>
  );
}
