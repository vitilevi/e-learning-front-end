import axios from 'axios';
import _ from 'lodash';

const http = axios.create({
  baseURL: "http://localhost:8080/user"
});

export interface UserInterface {
  name: string;
  email: string;
  address: string;
  reg_date: string;
  password: string;
  upload_photo: string;
}

class User {
  async getAll() {
    return _.get(await http.get("/"), "data");
  }

  async getById(id: number) {
    return _.get(await http.get(`/${id}`), "data");
  }

  async add(user: UserInterface) {
    const req = _.get(await http.post("/", user), "status");
    return req === 201;
  }

  async edit(id: number, user: UserInterface) {
    const req = _.get(await http.put("/", user), "status");
    return req === 200;
  }

  async delete(id: number) {
    const req = _.get(await http.delete(`/${id}`), "status");
    return req === 200;
  }
}

export default new User();