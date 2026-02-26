import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      {toast && (
        <div className="fixed top-6 right-6 z-[999] animate-slide-in">
          <div
            className={`
              px-6 py-4 rounded-2xl shadow-2xl font-semibold backdrop-blur-xl border
              ${
                toast.type === "success"
                  ? "bg-green-500/10 border-green-500/30 text-green-500"
                  : "bg-red-500/10 border-red-500/30 text-red-500"
              }
            `}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
