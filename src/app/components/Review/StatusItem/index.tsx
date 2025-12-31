export default function StatusItem({
  label,
  status,
  optional,
}: {
  label: string;
  status: boolean;
  optional?: boolean;
}) {
  return (
    <div className="review-item">
      <span>
        {label} {optional && "(Optional)"}
      </span>
      <strong className={status ? "success" : "warning"}>
        {status ? "Uploaded" : "Not Uploaded"}
      </strong>
    </div>
  );
}