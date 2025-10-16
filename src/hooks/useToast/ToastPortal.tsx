
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

export function ToastPortal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />,
    document.body
  );
}
