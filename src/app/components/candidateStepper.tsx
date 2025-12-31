"use client";
import { CANDIDATE_STEPS } from "@/constants/candidateSteps";

export default function CandidateStepper({
  currentStep,
}: {
  currentStep: string;
}) {
  const currentIndex = CANDIDATE_STEPS.findIndex(
    (s) => s.key === currentStep
  );

  return (
    <div className="stepper">
      {CANDIDATE_STEPS.map((step, index) => {
        const status =
          index < currentIndex
            ? "completed"
            : index === currentIndex
            ? "active"
            : "upcoming";

        return (
          <div className={`step ${status}`} key={step.key}>
            <div className="circle">{index + 1}</div>
            <span>{step.label}</span>
            {index < CANDIDATE_STEPS.length - 1 && (
              <div className="line" />
            )}
          </div>
        );
      })}
    </div>
  );
}
