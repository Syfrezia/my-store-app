import { useEffect } from "react";
import { Alert } from "react-bootstrap";

const FloatingAlert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <Alert
      variant="success"
      className="text-dark fw-semibold pt-2 pb-0"
      style={{
        position: "absolute",
        top: "0.8rem",
        right: "1rem",
        width: "15rem",
        height: "2.5rem",
      }}
    >
      <p className="d-flex justify-content-center align-items-center">
        {message}
      </p>
    </Alert>
  );
};

export default FloatingAlert;
