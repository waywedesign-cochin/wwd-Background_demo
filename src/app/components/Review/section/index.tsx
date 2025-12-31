export default function Section({
  title,
  editText,
  children,
}: {
  title: string;
  editText?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="review-section">
      <div className="section-header">
        <h3>{title}</h3>
        {editText && <span className="edit-link">{editText}</span>}
      </div>
      {children}
    </div>
  );
}