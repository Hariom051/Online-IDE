import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const notifysuccess= (print) => {
    toast.success(print, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const notifywarn = (notice) => {
    toast.error(notice, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  export  {notifysuccess,notifywarn};