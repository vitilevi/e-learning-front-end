import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import fetchApi from '../../../api/fetchApi';
import _ from 'lodash';
import './style.sass';

interface MatchParam {
  id: string
}

interface CourseProps extends RouteComponentProps<MatchParam> {}

const Course: React.FC<CourseProps> = ({match: {params}}) => {
  const [name, setName] = useState('');
  const [desp, setDesp] = useState('');
  const [fees, setFees] = useState(0);
  const [cResources, setCResources] = useState('');
  const [resources, setResources] = useState('');

  const CourseApi = new fetchApi('course');
  const history = useHistory();

  useEffect(() => {
    if(_.keys(params).includes('id')) {
      CourseApi.getById(params.id)
        .then(({c_name, c_desp, c_fees, c_resource}) => {
          setName(c_name);
          setDesp(c_desp);
          setFees(c_fees);
          setCResources(c_resource);
        })
    }
  }, [params])

  return(
    <form className="course-form m-auto">
      <div className="form-group">
        <label htmlFor="course-name" className="form-label">Name</label>
        <input
          type="text"
          id="course-name"
          className="form-control"
          value={name}
          onChange={({target: {value}}) => setName(value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="course-description" className="form-label">Description</label>
        <textarea
          id="course-description"
          className="form-control"
          value={desp}
          onChange={({target: {value}}) => setDesp(value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="course-resources" className="form-label">Course Resources</label>
        <input
          type="file"
          id="course-resources"
          className="form-control"
          value={resources}
          onChange={({target: {value}}) => setResources(value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="course-fees" className="form-label">Fees</label>
        <input
          type="number"
          id="course-fees"
          className="form-control"
          value={fees}
          onChange={({target: {value}}) => setFees(parseInt(value, 10))}
        />
      </div>
      <Button
        variant="primary"
        className="mt-3"
        onClick={async (e) => {
          e.preventDefault();
          const formattedResourceIndex = resources.split('\\').length;
          const formattedResource = resources.includes('\\')? resources.split('\\')[formattedResourceIndex - 1] : resources;
          const editCResources = resources === ''? cResources : formattedResource;
          const obj = {c_name: name, c_desp: desp, c_fees: fees, c_resource: editCResources }
          let redirect = false;
          if(_.keys(params).includes('id')) {
            redirect = await CourseApi.edit(params.id, obj);
          } else {
            redirect = await CourseApi.add(obj);
          }
          if(redirect) {
            history.push('/course')
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

export default Course