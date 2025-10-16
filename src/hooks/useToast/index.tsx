"use client"
import { toast as rawToast } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { ToastPortal } from "./ToastPortal";

let initialized = false;

const ensureToaster = () => {
    if (typeof window === "undefined" || initialized) return;

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<ToastPortal />);

    initialized = true;
}
export const useToast = function () {
    const toast = {
        warn: (msg: string) => {
            ensureToaster();
            rawToast(msg, {
                icon: "⚠️",
            })
        },
        success: (msg: string) => {
            ensureToaster();
            rawToast.success(msg);
        },
        error: (msg: string) => {
            ensureToaster();
            rawToast.error(msg);
        },
        loading: (msg: string) => {
            ensureToaster();
            return rawToast.loading(msg);
        },
        promise: rawToast.promise,
        raw: (...args: Parameters<typeof rawToast>) => {
            ensureToaster();
            return rawToast(...args);
        },
    };
    return {
        toast
    }
}
