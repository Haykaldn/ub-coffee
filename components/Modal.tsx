"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pop-up memakai <dialog> bawaan browser (fokus terkunci, Esc menutup).
 * Isi hanya dirender saat terbuka, jadi state di dalamnya selalu mulai dari awal tiap dibuka.
 */
export default function Modal({
  open,
  onClose,
  labelledBy,
  className = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Klik di luar kotak (latar gelap) menutup dialog
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {open && children}
    </dialog>
  );
}
