import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import fetchApi from '../../../api/fetchApi';
import _ from 'lodash';
import './style.sass';

interface MatchParam {
  id: string
}

interface FeedbackProps extends RouteComponentProps<MatchParam> {}

const Feedback: React.FC<FeedbackProps> = ({match: {params}}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userId, setUserId] = useState(0);

  const FeedbackApi = new fetchApi('feedback');
  const history = useHistory();

  useEffect(() => {
    if(_.keys(params).includes('id')) {
      FeedbackApi.getById(params.id)
        .then(({name, email, feedback, user_id}) => {
          setName(name);
          setEmail(email);
          setFeedback(feedback);
          setUserId(user_id);
        })
    }
  }, [params])

  return(
    <form className="feedback-form m-auto">
      {!_.keys(params).includes('id') && (
        <div className="form-group">
          <label htmlFor="feedback-user-id" className="form-label">User ID</label>
          <input
            type="number"
            id="feedback-user-id"
            className="form-control"
            value={userId}
            onChange={({target: {value}}) => setUserId(parseInt(value, 10))}
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="feedback-name" className="form-label">Name</label>
        <input
          type="text"
          id="feedback-name"
          className="form-control"
          value={name}
          onChange={({target: {value}}) => setName(value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="feedback-email" className="form-label">E-mail</label>
        <input
          type="text"
          id="feedback-email"
          className="form-control"
          value={email}
          onChange={({target: {value}}) => setEmail(value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="feedback-message" className="form-label">Feedback</label>
        <textarea
          id="feedback-message"
          className="form-control"
          value={feedback}
          onChange={({target: {value}}) => setFeedback(value)}
        />
      </div>
      <Button
        variant="primary"
        className="mt-3"
        onClick={async (e) => {
          e.preventDefault();
          const obj = {name, email, feedback, user_id: userId}
          let redirect = false;
          if(_.keys(params).includes('id')) {
            redirect = await FeedbackApi.edit(params.id, obj);
          } else {
            try {
              redirect = await FeedbackApi.add(obj);
            } catch (e) {
              alert('User ID doesn\'t exist');
            }
          }
          if(redirect) {
            history.push('/feedback')
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

export default Feedback