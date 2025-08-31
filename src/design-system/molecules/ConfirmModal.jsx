export default function ConfirmModal({
  open,
  title,
  children,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!open) return null;
  return (
    <div style={backdrop}>
      <div style={modal} role="dialog" aria-modal="true">
        {title && <h3 style={{ marginBottom: 8 }}>{title}</h3>}
        <div style={{ color: "#333", marginBottom: 16 }}>{children}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onCancel} style={btnSecondary}>
            {cancelText}
          </button>
          <button onClick={onConfirm} style={btnPrimary}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
};
const modal = {
  width: "min(520px, 92vw)",
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};
const btnPrimary = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
};
const btnSecondary = {
  background: "#e5e7eb",
  color: "#111",
  border: "none",
  borderRadius: 8,
  padding: "8px 12px",
};
