import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import fetchApi from '../../../api/fetchApi';
import _ from 'lodash';
import './style.sass';

interface MatchParam {
  id: string
}

interface UserProps extends RouteComponentProps<MatchParam> {}

const User: React.FC<UserProps> = ({match: {params}}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoUpload, setPhotoUpload] = useState('');
  const [regDate, setRegDate] = useState('');
  const UserApi = new fetchApi('user');
  const history = useHistory();

  useEffect(() => {
    if(_.keys(params).includes('id')) {
      UserApi.getById(params.id)
        .then(({name, email, phone_no, address, password, reg_date, upload_photo}) => {
          setName(name);
          setEmail(email);
          setPassword(password);
          setPhone(phone_no);
          setAddress(address);
          setRegDate(reg_date);
          setPhotoUpload(upload_photo);
        })
    }
  }, [params])

  return(
    <form className="registration-form m-auto">
      <div className="form-group">
        <label htmlFor="registration-name" className="form-label">Name</label>
        <input type="text"
          id="registration-name"
          className="form-control"
          onChange={({target: {value}}) => setName(value)}
          value={name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration-email" className="form-label">E-mail</label>
        <input
          type="text"
          id="registration-email"
          className="form-control"
          onChange={({target: {value}}) => setEmail(value)}
          value={email}
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration-password" className="form-label">Password</label>
        <input
          type="text"
          id="registration-password"
          className="form-control"
          onChange={({target: {value}}) => setPassword(value)}
          value={password}
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration-phone" className="form-label">Phone</label>
        <input
          type="text"
          id="registration-phone"
          className="form-control"
          onChange={({target: {value}}) => setPhone(value)}
          value={phone}
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration-address" className="form-label">Address</label>
        <input
          type="text"
          id="registration-address"
          className="form-control"
          onChange={({target: {value}}) => setAddress(value)}
          value={address}
        />
      </div>
      <div className="form-group">
        <label htmlFor="registration-photo" className="form-label">Upload Photo</label>
        <input
          type="file"
          id="registration-photo"
          className="form-control"
          onChange={({target: {value}}) => setPhoto(value)}
          value={photo}
        />
      </div>
      <Button
        variant="primary"
        className="mt-3"
        onClick={async (e) => {
          e.preventDefault();
          const getDate = new Date();
          const date = regDate !== ''? getDate.toISOString().split('T')[0].split('-').join('-') : regDate;
          const formattedPhotoIndex = photo.split('\\').length;
          const formattedPhoto = photo.includes('\\')? photo.split('\\')[formattedPhotoIndex - 1] : photo;
          const editPhoto = photo !== ''? formattedPhoto : photoUpload;
          const obj = {name, email, password, phone_no: phone, address, upload_photo: editPhoto, reg_date: date}
          let redirect = false;
          if(_.keys(params).includes('id')) {
            redirect = await UserApi.edit(params.id, obj);
          } else {
            redirect = await UserApi.add(obj);
          }
          if(redirect) {
            history.push('/user')
          } else {
            console.log('Error')
          }
        }}
      >
        {
          _.keys(params).includes('id')? 'Update' : 'Register'
        }
      </Button>
    </form>
  );
};

export default User;