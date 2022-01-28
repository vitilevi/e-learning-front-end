import axios from 'axios';
import _ from 'lodash';

const http = axios.create({
  baseURL: "http://localhost:8080/admin"
});

interface AdminTP {
  name: string;
  email: string;
  password: string;
}

class Admin {
  async getAll() {
    return _.get(await http.get("/"), "data");
  }

  async getById(id: number) {
    return _.get(await http.get(`/${id}`), "data");
  }

  async add(admin: AdminTP) {
    const req = _.get(await http.post("/", admin), "status");
    return req === 201;
  }

  async edit(id: number, admin: AdminTP) {
    const req = _.get(await http.put("/", admin), "status");
    return req === 200;
  }

  async delete(id: number) {
    const req = _.get(await http.delete(`/${id}`), "status");
    return req === 200;
  }
}

export default new Admin();