import { useState, createContext, useContext } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export default function GlobalToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className="fixed top-[200px] left-1/2 -translate-x-1/2
          px-6 py-3 rounded-xl text-white shadow-lg z-[9999]
          animate-toastSlide backdrop-blur-md"
          style={{
            background: toast.type === "error" ? "#e74c3c" : "#27ae60",
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
