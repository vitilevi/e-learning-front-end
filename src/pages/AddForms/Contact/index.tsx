import React from "react";
import {Button} from 'react-bootstrap';
import './style.sass';

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  return(
    <form className="contact-form m-auto">
      <div className="form-group">
        <label htmlFor="contact-user-id" className="form-label">User ID</label>
        <input type="text" id="contact-user-id" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">Name</label>
        <input type="text" id="contact-name" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">E-mail</label>
        <input type="text" id="contact-email" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="contact-phone" className="form-label">Phone</label>
        <input type="text" id="contact-phone" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">Message</label>
        <textarea id="contact-message" className="form-control"/>
      </div>
      <Button variant="primary" className="mt-3">Submit</Button>
    </form>
  );
};

export default Contact