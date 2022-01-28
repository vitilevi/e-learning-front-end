import React, {useEffect, useState} from "react";
import {RouteComponentProps} from "react-router-dom";
import fetchApi, {UserInterface} from "../../../api/fetchApi";
import {Table, Button} from 'react-bootstrap';
import _ from 'lodash';
import './style.sass';

interface MatchParam {
  table: string
}

interface UserProps extends RouteComponentProps<MatchParam>{
}

const User: React.FC<UserProps> = ({match: {params: {table}}}) => {
  const [userResults, setUserResults] = useState<UserInterface[]>([]);

  useEffect(() => {
  const UserApi = new fetchApi(table);
    UserApi.getAll()
      .then((data) => {
        if(data) {
          setUserResults([...data]);
        }
      });
  }, [table]);

  return(
    <div className="px-3">
      <Button className="mb-3 ms-auto">New user</Button>
      <Table>
        <thead>
          <tr>
            {
              _.map(userResults, (el, i) => {
                if(i === 0) {
                  return _(el)
                    .keys()
                    .map((key) => (
                    <th key={key}>{key}</th>
                    ))
                    .value()
                }
              })
            }
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            _.map(userResults, (res) => (
              <tr>
                {
                  _(res)
                    .valuesIn()
                    .map((val) => (
                      <td key={val}>{val}</td>
                    ))
                    .value()
                }
                <td>
                  <Button variant="warning">Edit</Button>
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default User;