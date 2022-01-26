import {Button} from "react-bootstrap";
import './style.sass';

interface CourseProps {}

const Course: React.FC<CourseProps> = () => {
  return(
    <form className="course-form m-auto">
      <div className="form-group">
        <label htmlFor="course-id" className="form-label">Course ID</label>
        <input type="text" id="course-id" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="course-name" className="form-label">Name</label>
        <input type="text" id="course-name" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="course-description" className="form-label">Description</label>
        <textarea id="course-description" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="course-resources" className="form-label">Course Resources</label>
        <input type="file" id="course-resources" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="course-fees" className="form-label">Fees</label>
        <input type="text" id="course-fees" className="form-control"/>
      </div>
      <Button variant="primary" className="mt-3">Submit</Button>
    </form>
  );
};

export default Course