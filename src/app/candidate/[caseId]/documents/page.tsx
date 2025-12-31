/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CandidateStepper from "@/app/components/candidateStepper";
import UploadField from "@/app/components/UploadField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import '../../../css/upload-documents.css'

type FileMap = {
  idProof?: File;
  addressProof?: File;
  photo?: File;
};

export default function DocumentsPage({ params }: any) {
  const router = useRouter();
    const [files, setFiles] = useState<FileMap>({});

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof FileMap
  ) => {
    if (!e.target.files?.length) return;
    setFiles((prev) => ({
      ...prev,
      [key]: e.target.files![0],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploaded Files:", files);
    // prepare FormData for API
  };

  const isDisabled = !files.idProof || !files.addressProof;
  return (
    <>
      <CandidateStepper currentStep="documents" />
      <div className="card">
        <h3>Upload Documents</h3>



         <div className="upload-wrapper">
      <h2>Upload Documents</h2>
      <p className="subtitle">
        Upload clear and readable documents to continue
      </p>

      <form onSubmit={handleSubmit}>
        <UploadField
          label="ID Proof"
          required
          file={files.idProof}
          onChange={(e) => handleFileChange(e, "idProof")}
        />

        <UploadField
          label="Address Proof"
          required
          file={files.addressProof}
          onChange={(e) => handleFileChange(e, "addressProof")}
        />

        <UploadField
          label="Photograph"
          file={files.photo}
          onChange={(e) => handleFileChange(e, "photo")}
        />

        <button type="submit" disabled={isDisabled} className="submit-btn"
        onClick={() => router.push(`/candidate/${params.caseId}/review`)}
        >
          Submit Documents
        </button>
      </form>
    </div>
        {/* <input type="file" multiple />
        <br />
        <button onClick={() => router.push(`/candidate/${params.caseId}/review`)}>
          Review
        </button> */}
      </div>
    </>
  );
}