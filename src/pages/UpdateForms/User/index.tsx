import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import User from '../../../api/user';
import {RouteComponentProps} from "react-router-dom";

interface EditUserProps {}

interface MatchParam {
  table: string;
  id: string;
}

interface EditUserProps extends RouteComponentProps<MatchParam>{
}

const EditUser: React.FC<EditUserProps> = () => {
  useEffect(() => {
    User.getAll()
      .then((data) => console.log(data));
  })

  return(
    <form className="registration-form m-auto">
      <div className="form-group">
        <label htmlFor="registration-user-id" className="form-label">User ID</label>
        <input
          type="text"
          id="registration-user-id"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration-name" className="form-label">Name</label>
        <input type="text" id="registration-name" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="registration-email" className="form-label">E-mail</label>
        <input type="text" id="registration-email" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="registration-password" className="form-label">Password</label>
        <input type="password" id="registration-password" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="registration-phone" className="form-label">Phone</label>
        <input type="text" id="registration-phone" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="registration-address" className="form-label">Address</label>
        <input type="text" id="registration-address" className="form-control"/>
      </div>
      <div className="form-group">
        <label htmlFor="registration-photo" className="form-label">Upload Photo</label>
        <input type="file" id="registration-photo" className="form-control"/>
      </div>
      <Button variant="primary" className="mt-3">Register</Button>
    </form>
  );
};

export default EditUser;