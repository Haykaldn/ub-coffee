import type { OpenState } from "@/lib/hours";

export default function OpenStatus({
  state,
  className = "",
}: {
  state: OpenState | null;
  className?: string;
}) {
  const variant = !state ? "is-pending" : state.isOpen ? "is-open" : "is-closed";
  const label = !state ? "Memuat jam buka" : state.isOpen ? "Buka sekarang" : "Sedang tutup";

  return (
    <span className={`status-pill ${variant} ${className}`} role="status">
      <span className="status-pill__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
