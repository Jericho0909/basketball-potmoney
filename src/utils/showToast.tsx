import { toast, ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error" | "default";

const ShowToast = () => {
  const toastMap: Record<ToastType, (message: any, options?: ToastOptions) => string> = {
    success: toast.success,
    error: toast.error,
    default: toast, 
  }

  const Toast = (type: ToastType, message: string, timer: number) => {
    const fn = toastMap[type] || toastMap.default

    fn(<div>{message}</div>, {
      style: {
        width: "100%",
        color: "black",
        padding: "12px 16px",
        borderRadius: "8px",
      },
      duration: timer,
    });
  };

  return { Toast };
};

export default ShowToast;
