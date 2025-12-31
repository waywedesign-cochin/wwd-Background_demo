export default function UploadField({
  label,
  required,
  file,
  onChange,
}: {
  label: string;
  required?: boolean;
  file?: File;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="upload-field">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>

      <div className="upload-box">
        <input type="file" onChange={onChange} />
        <span>
          {file ? file.name : "Click or drag file to upload"}
        </span>
      </div>

      <small>Supported: PDF, JPG, PNG (Max 5MB)</small>
    </div>
  );
}
