import { Alert } from "react-bootstrap";

const ErrorMessage = ({ error }) => {
  return (
    <Alert variant="danger" className="text-break">
      {error}
    </Alert>
  );
};

export default ErrorMessage;
