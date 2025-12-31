'use client'
import CandidateStepper from "@/app/components/candidateStepper";
import Item from "@/app/components/Review/Item";
import Section from "@/app/components/Review/section";
import StatusItem from "@/app/components/Review/StatusItem";
import '../../../css/review.css'

export default function ReviewPage() {
  const personalDetails = {
    firstName: "Rahul",
    lastName: "Krishnan",
    email: "rahul.krishnan@gmail.com",
    mobile: "9876543210",
    dob: "1995-08-12",
    gender: "Male",
    address: "Flat 302, Green Valley Apartments, Kochi, Kerala",
  };

  const documents = {
    idProof: true,
    addressProof: true,
    photo: false,
  };

  const handleSubmit = () => {
    alert("Application submitted successfully!");
  };

  return (
    <>
      <CandidateStepper currentStep="review" />
      <div className="card">

        <div className="review-wrapper">
          <div className="pHeader">
            <h2>Review & Submit</h2>
            <p className="subtitle">
              Please review your information before final submission
            </p>
          </div>
          {/* Personal Details */}
          <Section title="Personal Details" editText="Edit">
            <Item
              label="Name"
              value={`${personalDetails.firstName} ${personalDetails.lastName}`}
            />
            <Item label="Email" value={personalDetails.email} />
            <Item label="Mobile" value={personalDetails.mobile} />
            <Item label="Date of Birth" value={personalDetails.dob} />
            <Item label="Gender" value={personalDetails.gender} />
            <Item label="Address" value={personalDetails.address} />
          </Section>

          {/* Documents */}
          <Section title="Documents Uploaded" editText="Edit">
            <StatusItem label="ID Proof" status={documents.idProof} />
            <StatusItem label="Address Proof" status={documents.addressProof} />
            <StatusItem label="Photograph" status={documents.photo} optional />
          </Section>

          {/* Consent */}
          <Section title="Consent">
            <Item label="Terms & Privacy Policy" value="Accepted" />
          </Section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </>
  );
}