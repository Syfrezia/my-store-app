import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BiChevronLeft } from "react-icons/bi";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button variant="white" onClick={handleGoBack}>
      <BiChevronLeft className="fs-1" /> <span className="pe-3">Back</span>
    </Button>
  );
};

export default BackButton;
