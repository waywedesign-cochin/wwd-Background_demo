export default function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="review-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
