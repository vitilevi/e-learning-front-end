import React, {useEffect, useState} from "react";
import {RouteComponentProps, useHistory} from "react-router-dom";
import fetchApi from "../../../api/fetchApi";
import {Table, Button} from 'react-bootstrap';
import _ from 'lodash';
import './style.sass';

interface MatchParam {
  table: string
}

interface DataProps extends RouteComponentProps<MatchParam>{
}

const ViewData: React.FC<DataProps> = ({match: {params: {table}}}) => {
  const [data, setData] = useState<any[]>([]);
  const UserApi = new fetchApi(table);
  const history = useHistory();

  useEffect(() => {
    UserApi.getAll()
      .then((data) => {
        if(data) {
          setData([...data]);
        }
      });
  }, [table]);

  return(
    <div className="px-3">
      <Button
        className="mb-3 ms-auto"
        onClick={() => {
          history.push(`/${table}/new`)
        }}
      >
        {`New ${table}`}
      </Button>
      <Table>
        <thead>
          <tr>
            {
              _.map(data, (el, i) => {
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
            _.map(data, (res) => (
              <tr key={JSON.stringify(res)}>
                {
                  _(res)
                    .valuesIn()
                    .map((val, i) => (
                      <td key={`${Object.keys(res)[i]}${val}`}>{val}</td>
                    ))
                    .value()
                }
                <td>
                  <Button
                    variant="warning"
                    onClick={() => {
                      const [key] = Object.keys(res);
                      history.push(`/${table}/edit/${res[key]}`)
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={async () => {
                      const [key] = Object.keys(res);
                      const deleted = await UserApi.delete(res[key]);
                      if (deleted) window.location.reload()
                      else console.log('Error, not deleted')
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
};

export default ViewData;