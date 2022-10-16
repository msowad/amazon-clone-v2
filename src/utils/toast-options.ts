import { DefaultToastOptions } from "react-hot-toast";

export const toastOptions: DefaultToastOptions = {
  error: {
    style: {
      backgroundColor: "#C1300B",
      color: "#fff",
    },
  },
  success: {
    style: {
      backgroundColor: "#157F10",
      color: "#fff",
    },
  },
  duration: 4000,
};
