import {Button} from "react-bootstrap";
import './style.sass';

interface FeedbackProps {}

const Feedback: React.FC<FeedbackProps> = () => {
  return(
    <form className="feedback-form m-auto">
      <div className="form-group">
        <label htmlFor="feedback-user-id" className="form-label">User ID</label>
        <input type="text" id="feedback-user-id" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="feedback-name" className="form-label">Name</label>
        <input type="text" id="feedback-name" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="feedback-email" className="form-label">E-mail</label>
        <input type="text" id="feedback-email" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="feedback-message" className="form-label">Feedback</label>
        <textarea id="feedback-message" className="form-control"/>
      </div>
      <Button variant="primary" className="mt-3">Submit</Button>
    </form>
  );
};

export default Feedback