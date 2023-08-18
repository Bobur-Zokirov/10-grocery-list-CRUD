import { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    setTimeout(() => {
      removeAlert();
    }, 2000);
  }, [list, removeAlert]);
  return <p className={`alert ${type}`}>{msg}</p>;
};

export default Alert;
