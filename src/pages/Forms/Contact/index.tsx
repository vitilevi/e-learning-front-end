import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import fetchApi from '../../../api/fetchApi';
import _ from 'lodash';
import './style.sass';

interface MatchParam {
  id: string
}

interface ContactProps extends RouteComponentProps<MatchParam> {}

const Contact: React.FC<ContactProps> = ({match: {params}}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(0);

  const ContactApi = new fetchApi('contact');
  const history = useHistory();

  useEffect(() => {
    if(_.keys(params).includes('id')) {
      ContactApi.getById(params.id)
        .then(({name, email, phone_no, message, user_id}) => {
          setName(name);
          setEmail(email);
          setPhone(phone_no);
          setMessage(message);
          setUserId(user_id)
        })
    }
  }, [params])

  return(
    <form className="contact-form m-auto">
      {!_.keys(params).includes('id') && (
        <div className="form-group">
          <label htmlFor="contact-user-id" className="form-label">User ID</label>
          <input
            type="number"
            id="contact-user-id"
            className="form-control"
            value={userId}
            onChange={({target: {value}}) => setUserId(parseInt(value, 10))}
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">Name</label>
        <input
          type="text"
          id="contact-name"
          className="form-control"
          onChange={({target: {value}}) => setName(value)}
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">E-mail</label>
        <input
          type="text"
          id="contact-email"
          className="form-control"
          onChange={({target: {value}}) => setEmail(value)}
          value={email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-phone" className="form-label">Phone</label>
        <input
          type="text"
          id="contact-phone"
          className="form-control"
          onChange={({target: {value}}) => setPhone(value)}
          value={phone}
        />
      </div>
      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">Message</label>
        <textarea
          id="contact-message"
          className="form-control"
          value={message}
          onChange={({target: {value}}) => setMessage(value)}
        />
      </div>
      <Button
        variant="primary"
        className="mt-3"
        onClick={async (e) => {
          e.preventDefault();
          const obj = {name, email, phone_no: phone, message, user_id: userId}
          let redirect = false;
          if(_.keys(params).includes('id')) {
            redirect = await ContactApi.edit(params.id, obj);
          } else {
            try {
              redirect = await ContactApi.add(obj);
            } catch (e) {
              alert('User ID doesn\'t exist');
            }
          }
          if(redirect) {
            history.push('/contact')
          } else {
            console.log('Error')
          }
        }}
      >
        {
          _.keys(params).includes('id')? 'Update' : 'Submit'
        }
      </Button>
    </form>
  );
};

export default Contact