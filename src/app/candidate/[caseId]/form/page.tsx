/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CandidateStepper from "@/app/components/candidateStepper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import '../../../css/personal-details.css'

export default function FormPage({ params }: any) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    // API integration later
  };
  return (
    <>
      <CandidateStepper currentStep="form" />
      <div className="card">

        <div className="pHeader">
          <h2>Personal Details</h2>
          <p className="subtitle">
            Please provide accurate information as per your records
          </p>
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="gender-group">
              <label>Gender</label>
              <div className="radio-row">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    onChange={handleChange}
                  />{" "}
                  Other
                </label>
              </div>
            </div>

            <div>
              <label>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid-3">
              <div>
                <label>City</label>
                <input name="city" value={form.city} onChange={handleChange} />
              </div>
              <div>
                <label>State</label>
                <input name="state" value={form.state} onChange={handleChange} />
              </div>
              <div>
                <label>Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  maxLength={6}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" onClick={() => router.push(`/candidate/${params.caseId}/documents`)}>
              Save & Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}